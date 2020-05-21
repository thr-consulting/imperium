import debug from 'debug';
import type {Context} from './index';

const d = debug('imperium.examples.domain-advanced.SecureModel');

/*
	This is an example of a plain domain model that uses auth to check who is making the
	request.

	The canAccess method isn't required, but is a useful design when checking permissions.
 */

class SecureModel {
	static async canAccess(params: {id: string; date: Date}, ctx: Context) {
		// Can access would take domain specific parameters
		const isEven = params.date.getSeconds() % 2 !== 0;

		// Get cached access by passing in unique domain specific data
		if (!ctx.auth.id) return false;

		const even = isEven ? 'even' : 'odd';

		// d(await ctx.auth.getCache([params.id, even, ctx.auth.id]));
		const cachedAccess = await ctx.auth.getCache([params.id, even, ctx.auth.id]);
		if (cachedAccess !== null) return cachedAccess;

		// Calculate domain specific access
		if (ctx.auth.hasPermission('admin')) return ctx.auth.setCache([params.id, even, ctx.auth.id], true);
		if (isEven && ctx.auth.id) return ctx.auth.setCache([params.id, even, ctx.auth.id], true);
		return ctx.auth.setCache([params.id, even, ctx.auth.id], false);
	}

	static async getSecureData(id: string, ctx: Context) {
		// const hasAdmin = await ctx.auth.hasPermission('admin');
		// const authId = ctx.auth.id;
		// d(hasAdmin, authId);

		// await ctx.auth.setCache('thing1', true);
		// const v = await ctx.auth.getCache('thing1');
		// d(v);
		// await ctx.auth.invalidateCache('thing1');
		// d(ctx.auth.id);
		const a = await ctx.auth.hasPermission('admin');
		d(`hasPermission: ${a}`);

		if (!(await this.canAccess({id, date: new Date()}, ctx))) {
			throw new Error('Rejected');
		}
		return `My Super Secure Data: ${id}`;
	}
}

export {SecureModel};
