import { Page } from 'puppeteer-core';
import { Context, h, Random } from 'koishi';
import { SigninService } from '../core/signin';
import { Fate } from '../core/roll';
import fs from 'fs';
import path from 'path';
import {} from 'koishi-plugin-puppeteer';
import { Config } from './types';
import { logger, RollEvent } from '..';
import { defaultEventJson } from '../data/defaults';
import { fetchHitokoto } from '../utils/external';
import { pathToFileURL } from 'url';
import { getFolderImg } from '../utils/files';

const templateHTML = fs.readFileSync(path.resolve(__dirname, './assets/template.txt'), 'utf-8');
// 获取标准化资源基准路径
const baseDir = path.resolve(__dirname, './assets');
const baseURL = new URL(`file://${baseDir}/`).href; // 确保结尾斜杠

let pagePool: Page[] = [];
const MAX_POOL_SIZE = 5;

// 路径解析系统
function resolveAsset(relativePath: string) {
	return new URL(relativePath, baseURL).href;
}

async function initPagePool(ctx: Context) {
	const browser = ctx.puppeteer.browser;
	pagePool = await Promise.all(
		Array.from({ length: MAX_POOL_SIZE }, async () => {
			const page = await browser.newPage();
			await page.setViewport({ width: 600, height: 1080 * 2 });

			// 预加载基础环境
			await page.goto(baseURL); // 导航到基准路径
			await page.evaluate(() => (document.body.innerHTML = '')); // 清空初始内容
			return page;
		})
	);
}

export function registerFortuneCommand(
	ctx: Context,
	config: Config,
	signin: SigninService,
	jrys: Fate
) {
	const eventJson = [...defaultEventJson, ...config.event];

	ctx.command('jrys', '今日运势')
		.userFields(['id', 'name'])
		.action(async ({ session }) => {
			const date = new Date();

			let name: string = '';
			if (session.user.name) {
				name = `@${session.user.name}`;
			}
			name = name.length > 13 ? name.substring(0, 12) + '...' : name;

			const luck = await jrys.getFortune(session.user.id);
			const sign = await signin.callSignin(session.user.id, session.author.id, luck);

			const month = (date.getMonth() + 1).toString().padStart(2, '0');
			const day = date.getDate().toString().padStart(2, '0');
			const luckInfo = signin.getFortuneInfo(luck, config.fortuneSet);
			const [gooddo1, gooddo2, baddo1, baddo2] = await jrys.getRandomObjects(
				eventJson,
				session.user.id
			);
			const hitokoto = await fetchHitokoto();
			const greeting = signin.getGreeting(date.getHours());
			const levelinfo = signin.getLevelInfo(sign.allExp, config.levelSet);
			const percent =
				typeof levelinfo.nextExp == 'string'
					? '100.000'
					: ((sign.allExp / levelinfo.nextExp) * 100).toFixed(3).toString();

			let bgUrl;
			if (config.imgUrl.match(/http(s)?:\/\/(.*)/gi)) {
				bgUrl = config.imgUrl;
			} else {
				bgUrl = pathToFileURL(
					path.resolve(
						__dirname,
						config.imgUrl + Random.pick(await getFolderImg(config.imgUrl))
					)
				).href;
			}

			let avatarUrl = session.author.avatar;
			if (avatarUrl == undefined) {
				avatarUrl = 'avatar.png';
			}

			try {
				const content = templateHTML
					.replace(
						'${bodyClass}',
						date.getHours() >= 18 || date.getHours() < 6 ? 'darkMode' : ''
					)
					.replace('${bgUrl}', bgUrl)
					.replace('${avatarUrl}', avatarUrl)
					.replace('${greeting}', greeting)
					.replace('${date}', `${month}/${day}`)
					.replace('${hitokoto}', hitokoto)
					.replace('${name}', name)
					.replace(
						'${signStatus}',
						sign.status === 1
							? '今天已经签到过了！'
							: '签到成功！ 🫧+' + sign.getExp + '🪙+' + sign.getCoin
					)
					.replace('${levelColor}', levelinfo.levelInfo.levelColor)
					.replace('${levelName}', levelinfo.levelInfo.levelName)
					.replace('${exp}', `${sign.allExp}/${levelinfo.nextExp}`)
					.replace('${expPercent}', percent)
					.replace('${luckValue}', luck.toString())
					.replace('${luckDescription}', luckInfo)
					.replace(
						'${gooddo}',
						`${gooddo1.name}——${gooddo1.good}<br>${gooddo2.name}——${gooddo2.good}`
					)
					.replace(
						'${baddo}',
						`${baddo1.name}——${baddo1.bad}<br>${baddo2.name}——${baddo2.bad}`
					);

				console.debug(content);

				if (pagePool.length === 0) await initPagePool(ctx);
				let page: Page;
				try {
					page = pagePool.pop() || (await ctx.puppeteer.browser.newPage());

					// 通过设置基准URL来加载本地资源
					await page.goto(baseURL);
					await page.setContent(content, {
						waitUntil: 'networkidle0',
					});

					await page.waitForSelector('#body', { timeout: 30000 });
					const element = await page.$('#body');

					let msg;
					if (!element) {
						msg = null;
						throw new Error('Element not found');
					}

					const imgBuf = await element.screenshot({
						encoding: 'binary',
					});
					msg = h.image(imgBuf, 'image/png');

					return h.quote(session.event.message.id) + msg;
				} finally {
					if (page) {
						await page.evaluate(() => {
							document.body.innerHTML = '';
							window.scrollTo(0, 0);
						});
						if (pagePool.length < MAX_POOL_SIZE) {
							pagePool.push(page);
						} else {
							await page.close();
						}
					}
				}
			} catch (err) {
				logger.error(err);
				return '服务内部错误，请联系管理员。';
			}
		});
}
