import debug from 'debug';
import type {Context} from './index';

const d = debug('imperium.examples.domain-advanced.SecureModel');

class SecureModel {
	static async canAccess(params: {id: string; date: Date}, ctx: Context) {
		// Can access would take domain specific parameters
		const isEven = params.date.getSeconds() % 2 !== 0;

		d(ctx.auth.id);


		// Get cached access by passing in unique domain specific data
		if (!ctx.auth.id) return false;

		const even = isEven ? 'even' : 'odd';

		d(await ctx.auth.getCache([params.id, even, ctx.auth.id]));
		const cachedAccess = await ctx.auth.getCache([params.id, even, ctx.auth.id]);
		if (cachedAccess !== null) return cachedAccess;

		// Calculate domain specific access
		if (ctx.auth.hasPermission('admin')) return ctx.auth.setCache([params.id, even, ctx.auth.id], true);
		if (isEven && ctx.auth.id) return ctx.auth.setCache([params.id, even, ctx.auth.id], true);
		return ctx.auth.setCache([params.id, even, ctx.auth.id], false);
	}

	static async getSecureData(id: string, ctx: Context) {
		if (!(await this.canAccess({id, date: new Date()}, ctx))) {
			return 'Rejected';
		}
		return `My Super Secure Data: ${id}`;
	}
}

export {SecureModel};
