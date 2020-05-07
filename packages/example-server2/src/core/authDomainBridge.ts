import type {AuthRequiredDomain} from '@imperium/auth-server';

export const authDomainBridge: AuthRequiredDomain = {
	async getCache() {
		return null;
	},
	async getPermissions() {
		return ['admin'];
	},
	async getServiceInfo() {
		return {
			id: '1234',
			password: {bcrypt: '1234'},
			roles: ['admin'],
		};
	},
	async invalidateCache() {},
	async setCache(key: string | string[], value: any): Promise<typeof value> {
		return value;
	},
};
