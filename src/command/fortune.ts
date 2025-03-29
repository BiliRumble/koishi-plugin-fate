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
let pagePool: Page[] = [];
const MAX_POOL_SIZE = 5;

async function initPagePool(ctx: Context) {
  const browser = ctx.puppeteer.browser
  pagePool = await Promise.all(
      Array.from({ length: MAX_POOL_SIZE }, () => browser.newPage())
  )
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

			const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 确保月份为两位数
			const day = date.getDate().toString().padStart(2, '0'); // 确保日期为两位数
			const luckInfo = signin.getFortuneInfo(luck, config.fortuneSet); // 运势描述
			const [gooddo1, gooddo2, baddo1, baddo2] = await jrys.getRandomObjects(
				eventJson,
				session.user.id
			); // 4*宜/不宜
			const hitokoto = await fetchHitokoto(); // 一言
			const greeting = signin.getGreeting(date.getHours()); // 问候
			const isNight = date.getHours() >= 18 || date.getHours() < 6;
			const levelinfo = signin.getLevelInfo(sign.allExp, config.levelSet); //等级信息
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
			const gooddo = `${gooddo1.name}——${gooddo1.good}<br>${gooddo2.name}——${gooddo2.good}`;
			const baddo = `${baddo1.name}——${baddo1.bad}<br>${baddo2.name}——${baddo2.bad}`;

			try {
				let pageBody = `
<body id="body" ${isNight ? 'class="dark-mode"' : ''}>
    <div class="container">

        <img style="width: 100%;" src="${bgUrl}" alt="Top Image">

        <div class="header">
            <img class="avatar" src="${avatarUrl}" alt="Avatar">
            <div class="date">
                <span class="greeting">${greeting}</span>
                <span style="color: #666666;">${month}/${day}</span>
            </div>
        </div>

        <div class="hitokoto">
            <p>${hitokoto}</p>
        </div>

        <div class="content">
            <div class="signin"><strong>${name}</strong> ${sign.status === 1 ? '今天已经签到过了！' : '签到成功！ 🫧+' + sign.getExp + '🪙+' + sign.getCoin}</div>

            <div class="level">
                <span style="color: ${levelinfo.levelInfo.levelColor};">${levelinfo.levelInfo.levelName}</span>
                <span style="color: #b4b1b1;">${sign.allExp}/${levelinfo.nextExp}</span>
            </div>

            <div class="level-bar">
                <div class="bar-container">
                    <div class="progress" style="width: calc(${percent}%);"></div>
                </div>
            </div>

            <div class="fortune">
                <span style="font-size: 36px; font-weight: bold;">🍀${luck}</span>
                <span style="font-size: 28px; color: #838383;">🌠${luckInfo}</span>
            </div>

            <hr>

            <div class="Cando">
                <div class="background" style="background-color: #D4473D;"><span>宜</span></div>
                <p style="text-shadow: 0px 0px 1px #ffbbbb;">${gooddo}</p>
            </div>

            <div class="Cando">
                <div class="background" style="background-color: #000000;"><span>忌</span></div>
                <p style="text-shadow: 0px 0px 1px #bcdbff;">${baddo}</p>
            </div>

        </div>
        <div class="credit">
            随机生成 请勿迷信
        </div>
    </div>
</body>

</html>`;

				await fs.writeFileSync(
					path.resolve(__dirname, './assets/index.html'),
					templateHTML + pageBody
				);

				// 初始化池（在apply函数或首次调用时初始化）
        if (pagePool.length === 0) await initPagePool(ctx);

        // 从池中获取页面
        const page = pagePool.pop() || await ctx.puppeteer.page();
        await page.setViewport({ width: 600, height: 1080 * 2 });
				await page.goto(`file:///${path.resolve(__dirname, './assets/index.html')}`);
				await page.waitForSelector('#body');
				const element = await page.$('#body');
				let msg;
				if (element) {
					const imgBuf = await element.screenshot({
						encoding: 'binary',
					});
					msg = h.image(imgBuf, 'image/png');
				} else {
					msg = 'Failed to capture screenshot.';
				}
				// 关闭页面
				await page.goto('about:blank');
        pagePool.push(page);
				// 返回消息
				return h.quote(session.event.message.id) + msg;
			} catch (err) {
				logger.error(err);
				return '服务内部错误，请联系管理员。';
			}
		});
}
