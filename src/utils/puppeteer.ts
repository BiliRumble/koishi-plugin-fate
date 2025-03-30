import { Context } from 'koishi';
import { Page } from 'puppeteer-core';

export const MAX_POOL_SIZE = 5;

export async function initBrowserPool(ctx: Context): Promise<Page[]> {
	const browser = ctx.puppeteer.browser;
	return Promise.all(
		Array.from({ length: MAX_POOL_SIZE }, async () => {
			const page = await browser.newPage();
			await page.setViewport({ width: 600, height: 1080 * 2 });
			await page.goto(ctx.state.baseURL);
			await page.evaluate(() => (document.body.innerHTML = ''));
			return page;
		})
	);
}

export function disposeBrowserPool(pages: Page[]) {
	return Promise.all(pages.map((page) => page.close()));
}
