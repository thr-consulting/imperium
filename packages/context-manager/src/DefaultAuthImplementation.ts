import type {AuthImplementation} from './Auth';

export class DefaultAuthImplementation implements AuthImplementation {
	hasPermission() {
		return false;
	}

	async setCache(key: string | string[], allowed: boolean) {
		return allowed;
	}

	async getCache() {
		return null;
	}

	async invalidateCache() {
		return Promise.resolve();
	}
}
