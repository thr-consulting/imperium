import debug from 'debug';
import type {AuthRequiredDomain} from '@imperium/auth-server';
import type {Context} from './index';

const d = debug('imperium.examples.server.domain3');

export function authDomainBridge(): AuthRequiredDomain {
	return {
		async getServiceInfo(identifier: string, context: Context) {
			d(`Id: ${identifier} User: ${context.auth}`);
			return {
				id: '1234',
				password: {bcrypt: '1234'},
				roles: ['admin'],
			};
		},
		async getPermissions(roles: string[], context: any) {
			return ['admin'];
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
