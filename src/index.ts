import { Context, Logger } from 'koishi';
import { registerCommands } from './command';
import { initDatabase } from './database/model';
import { Config } from './command/types';
import path from 'path';

export * from './data/types';
export { Config } from './command/types';

export const inject = {
	required: ['database', 'puppeteer', 'monetary'],
};

export const name = 'fate';
export const logger = new Logger('[Fate]>> ');

export function apply(ctx: Context, config: Config) {
	const baseDir = path.resolve(__dirname, './assets');
	ctx.state.baseDir = baseDir;
	ctx.state.baseURL = new URL(`file://${baseDir}/`).href;

	initDatabase(ctx);
	registerCommands(ctx, config);
}
