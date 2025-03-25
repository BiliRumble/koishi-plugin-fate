import { Context } from 'koishi';
import { LevelInfo, FortuneInfo, UserFortune } from '../data/types';
import { Fate } from './roll';
import { timeGreetings } from '../data/defaults';
import {} from 'koishi-plugin-monetary';
import { Config } from '../command/types';

declare module 'koishi' {
	interface Tables {
		fate: UserFortune;
		jrys: UserFortune; // old database support
	}
}

export class SigninService {
	public ctx: Context;
	public cfg: any;
	constructor(context: Context, config: Config) {
		this.ctx = context;
		this.cfg = config;
	}

	async callSignin(uid: number, userid: string, luck: number) {
		const date = new Date();
		const roll = new Fate();

		const exp = await roll.random(this.cfg.signExp[0], this.cfg.signExp[1], luck);
		const coin = await roll.random(this.cfg.signCoin[0], this.cfg.signCoin[1], luck);

		const userData = await this.ctx.database.get('fate', { id: uid });

		if (userData.length === 0) {
			let accCount = 1;
			let accExp = exp;

			this.ctx.database.create('fate', {
				id: uid,
				name: userid,
				time: date,
				exp: accExp,
				signCount: accCount,
			});
			this.ctx.monetary.gain(uid, coin, this.cfg.currency);

			return {
				status: 0,
				getExp: exp,
				allExp: accExp,
				getCoin: coin,
				signTime: date,
				count: accCount,
			};
		}

		if (userData[0].time.getDate() === date.getDate()) {
			return {
				status: 1,
				getExp: 0,
				allExp: userData[0].exp,
				getCoin: 0,
				signTime: userData[0].time,
				count: userData[0].signCount,
			};
		} else {
			let accExp = userData[0].exp + exp;
			let accCount = userData[0].signCount + 1;
			this.ctx.database.set(
				'fate',
				{ id: uid },
				{
					name: userid,
					time: date,
					exp: accExp,
					signCount: accCount,
				}
			);
			this.ctx.monetary.gain(uid, coin, this.cfg.currency);

			return {
				status: 0,
				getExp: exp,
				allExp: accExp,
				getCoin: coin,
				signTime: date,
				count: accCount,
			};
		}
	}

	getLevelInfo(exp: number, info: LevelInfo[]) {
		let index = 0;
		for (let i = 0; i < info.length; i++) {
			if (exp >= info[i].levelExp) {
				index++;
			} else {
				break;
			}
		}
		let nExp: number | string;
		if (index >= info.length) {
			nExp = '???';
		} else {
			nExp = info[index].levelExp;
		}
		index--;
		return {
			levelInfo: info[index],
			nextExp: nExp,
		};
	}

	getFortuneInfo(luck: number, info: FortuneInfo[]): string {
		let index = 0;
		for (let i = 0; i < info.length; i++) {
			if (luck >= info[i].luck) {
				index++;
			} else {
				break;
			}
		}
		index--;

		return info[index].desc;
	}

	getGreeting(hour: number): string {
		const greeting = timeGreetings.find(
			(timeGreeting) => hour >= timeGreeting.range[0] && hour < timeGreeting.range[1]
		);

		return greeting ? greeting.message : '你好';
	}
}
