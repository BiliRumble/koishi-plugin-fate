import { Context, h, Random } from 'koishi';
import { pathToFileURL } from 'url';
import fs from 'fs';
import path from 'path';

import * as si from '../core/signin';

import {} from 'koishi-plugin-puppeteer';
import { Page } from 'puppeteer-core';
import { Config } from './types';
import { defaultEventJson } from '../data/defaults';
import { RollEvent } from '../data/types';
import { Fate } from '../core/roll';
import { logger } from '..';

export function registerCommands(ctx: Context, config: Config) {
	const signin = new si.SigninService(ctx, config);
	const jrys = new Fate();

	let eventJson: RollEvent[] = [];
	defaultEventJson.forEach((item) => {
		eventJson.push(item);
	});
	config.event.forEach((item) => {
		eventJson.push(item);
	});

	ctx.command('jrysmigrate <qqname:string>')
		.userFields(['id', 'name'])
		.action(async ({ session }, qqname) => {
			const oldData = await ctx.database.get('jrys', { name: qqname });
			if (oldData.length === 0) {
				return '用户未找到，请检查用户名是否正确输入';
			}

			const nowData = await ctx.database.get('fate', { id: session.user.id });
			if (nowData.length === 0) {
				// create new record
				await ctx.database.create('fate', {
					id: session.user.id,
					name: session.author.id,
					time: oldData[0].time,
					exp: oldData[0].exp,
					signCount: oldData[0].signCount,
				});
			} else {
				// add to exits record
				await ctx.database.set(
					'fate',
					{ id: session.user.id },
					{
						name: session.author.id,
						exp: nowData[0].exp + oldData[0].exp,
						signCount: nowData[0].signCount + oldData[0].signCount,
					}
				);
			}
			return '已成功迁移数据';
		});

	ctx.command('jrys', '今日运势')
		.userFields(['id', 'name'])
		.action(async ({ session }) => {
			const date = new Date();

			let name: string = '';
			if (session.user.name) {
				name = `@${session.user.name}`;
			}
			name = name.length > 13 ? name.substring(0, 12) + '...' : name;

			const luck = await jrys.getFortune(session.user.id); //运势值
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

			let page: Page;
			try {
				let templateHTML = fs.readFileSync(
					path.resolve(__dirname, './assets/template.txt'),
					'utf-8'
				);

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

				page = await ctx.puppeteer.page();
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
				await page.close();
				// 返回消息
				return h.quote(session.event.message.id) + msg;
			} catch (err) {
				logger.error(err);
				return '服务内部错误，请联系管理员';
			}
		});
}

async function fetchHitokoto() {
	try {
		const response = await fetch('https://v1.hitokoto.cn/?c=a&c&b&k');
		const {
			hitokoto: hitokotoText,
			from: fromText,
			from_who: fromWhoText,
		} = await response.json();

		let hitokoto;
		if (fromWhoText != null) {
			hitokoto = `『${hitokotoText}』<br>——&nbsp;${fromWhoText}「${fromText}」`;
		} else {
			hitokoto = `『${hitokotoText}』<br>——「${fromText}」`;
		}

		return hitokoto;
	} catch (error) {
		console.error('获取 hitokoto 时出错:', error);
		return '无法获取 hitokoto';
	}
}

async function getFolderImg(folder: string) {
	let imgfilename = await readFilenames(folder);
	const filteredArr = imgfilename.filter((filename) => {
		return /\.(png|jpg|jpeg|ico|svg)$/i.test(filename);
	});
	return filteredArr;
}

// 递归获取文件夹内所有文件的文件名
async function readFilenames(dirPath: string) {
	let filenames = [];
	const files = fs.readdirSync(dirPath);
	files.forEach((filename) => {
		const fullPath = path.join(dirPath, filename);
		if (fs.statSync(fullPath).isDirectory()) {
			filenames = filenames.concat(readFilenames(fullPath));
		} else {
			filenames.push(filename);
		}
	});
	return filenames;
}
