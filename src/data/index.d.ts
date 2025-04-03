import { Context } from 'koishi';
import { Page } from 'puppeteer-core';

declare module 'koishi' {
	interface Context {
		state: {
			baseURL?: string;
			baseDir?: string;
		};
	}
}
