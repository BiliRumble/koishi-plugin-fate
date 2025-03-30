import { Context } from 'koishi';
import { logger } from '..';

export function registerMigrationCommand(ctx: Context) {
	ctx.command('jrysmigrate <qqname:string>')
		.userFields(['id', 'name'])
		.action(async ({ session }, qqname) => {
			try {
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
				return `迁移成功！`;
			} catch (error) {
				logger.error(error);
				return '服务内部错误，请联系管理员。';
			}
		});
}
