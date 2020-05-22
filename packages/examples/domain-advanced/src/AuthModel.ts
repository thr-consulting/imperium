/* eslint-disable react/static-property-placement */
import debug from 'debug';
import type {AuthDomain, ServiceInfo} from '@imperium/auth-server';
import type {Context} from './index';

const d = debug('imperium.examples.domain-advanced.AuthModel');

/*
	This domain model implements AuthDomain (which extends from AuthAccessor).

	This domain should not do any caching as this is done elsewhere.
*/

const authKeyPrefix = 'auth';

function getKey(key: string | string[]) {
	return key instanceof Array ? [authKeyPrefix, ...key].join(':') : `${authKeyPrefix}:${key}`;
}

export class AuthModel implements AuthDomain {
	private context: Context;

	private constructor(context: Context) {
		this.context = context;
	}

	static create(context: Context) {
		return new AuthModel(context);
	}

	async setCache(key: string | string[], value: any, expire?: number): Promise<typeof value> {
		await this.context.connectors.connections.sharedCache.set(getKey(key), value, expire);
		return value;
	}

	async getCache(key: string | string[]): Promise<any> {
		return this.context.connectors.connections.sharedCache.get(getKey(key));
	}

	async invalidateCache(key: string | string[]): Promise<void> {
		await this.context.connectors.connections.sharedCache.clear(getKey(key));
	}

	async getPermissions(id: string): Promise<string[]> {
		// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
		const user = await this.context.context.User.getUserById(id, this.context);
		// Use user to look up permissions.
		return ['admin'];
	}

	async getServiceInfo(id: string): Promise<ServiceInfo | null> {
		const user = await this.context.context.User.getUserById(id, this.context);
		if (!user) return null;
		return {
			id,
			...user.services,
		};
	}
}
