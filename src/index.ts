import { Context, Logger } from 'koishi';
import { registerCommands } from './command';
import { initDatabase } from './database/model';
import { Config } from './command/types';

export * from './data/types';
export { Config } from './command/types';

export const inject = {
	required: ['database', 'puppeteer', 'monetary'],
};

export const name = 'fate';
export const logger = new Logger('[Fate]>> ');

export function apply(ctx: Context, config: Config) {
	initDatabase(ctx);
	registerCommands(ctx, config);
}
