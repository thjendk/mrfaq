import { Context } from 'config/apolloServer';

export const permitAdmin = (ctx: Context) => {
	if (!ctx.admin) throw new Error('not permitted');
};
