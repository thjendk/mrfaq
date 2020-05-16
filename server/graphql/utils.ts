import { Context } from 'config/apolloServer';

export const permitAdmin = (ctx: Context, level = 1) => {
	if (!ctx.admin) throw new Error('not permitted');
	if (ctx.admin.level < level) throw new Error('not permitted');
};
