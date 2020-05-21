import debug from 'debug';
import type {AuthDomain, ServiceInfo} from '@imperium/auth-server';
import type {Context, DomainAdvancedConnectors} from './index';

const d = debug('imperium.examples.domain-advanced.AuthModel');

/*
	This domain model implements AuthDomain (which extends from AuthAccessor).

	This domain should not do any caching as this is done elsewhere.
*/

export class AuthModel implements AuthDomain {
	private connectors: DomainAdvancedConnectors;

	constructor(connectors: DomainAdvancedConnectors) {
		this.connectors = connectors;
	}

	async setCache(key: string | string[], value: any, expire?: number): Promise<typeof value> {
		await this.connectors.connections.sharedCache.set(key instanceof Array ? key.join('.') : key, value, expire);
		return value;
	}

	async getCache(key: string | string[]): Promise<any> {
		return this.connectors.connections.sharedCache.get(key instanceof Array ? key.join('.') : key);
	}

	async invalidateCache(key: string | string[]): Promise<void> {
		await this.connectors.connections.sharedCache.clear(key instanceof Array ? key.join('.') : key);
	}

	async getServiceInfo(id: string): Promise<ServiceInfo | null> {
		// const user = await ctx.context.User.getUserById(id, ctx);
		// // if (!user) return null;
		// return {
		// 	id,
		// 	// ...user.services,
		// };
	}

	async getPermissions(id: string, context: Context): Promise<string[]> {
		// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
		const user = await context.context.User.getUserById(id, context);
		// Use user to look up permissions.
		return ['admin'];
	}
}
