import { Context } from 'koishi';
import * as si from '../core/signin';
import {} from 'koishi-plugin-puppeteer';
import { Config } from './types';
import { Fate } from '../core/roll';
import { registerFortuneCommand } from './fortune';
import { registerMigrationCommand } from './migration';

export function registerCommands(ctx: Context, config: Config) {
	const signin = new si.SigninService(ctx, config);
	const jrys = new Fate();

	registerFortuneCommand(ctx, config, signin, jrys);
	registerMigrationCommand(ctx);
}
