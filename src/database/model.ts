import { Context } from 'koishi';

export const initDatabase = (ctx: Context) => {
	ctx.model.extend('fate', {
		id: 'integer',
		name: 'string',
		time: 'timestamp',
		exp: 'unsigned',
		signCount: 'unsigned',
	});
};
