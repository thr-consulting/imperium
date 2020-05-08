import type {AuthRequiredDomain} from '@imperium/auth-server';
import type {Context} from './server';

export function authDomainBridge(ctx: Context): AuthRequiredDomain {
	return {
		async getPermissions() {
			return ['admin'];
			// ctx.
		},
		async getServiceInfo() {
			return {
				id: '1234',
				password: {bcrypt: '1234'},
				roles: ['admin'],
			};
		},
		async getCache() {

			return null;
		},
		async invalidateCache() {},
		async setCache(key: string | string[], value: any): Promise<typeof value> {
			return value;
		},
	};
}
