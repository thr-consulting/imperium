import type SharedCache from '@thx/sharedcache';

interface CachedAuthenticationConstructor {
	cache: SharedCache;
}

export abstract class CachedAuthentication {
	private readonly cache: SharedCache;
	private readonly prefix: string;

	constructor({cache}: CachedAuthenticationConstructor) {
		this.cache = cache;
		this.prefix = 'auth';
	}

	private getKey(key: string | string[]) {
		return key instanceof Array ? [this.prefix, ...key].join(':') : `${this.prefix}:${key}`;
	}

	getCache(key: string | string[]) {
		return this.cache.get(this.getKey(key));
	}

	async invalidateCache(key: string | string[]): Promise<void> {
		await this.cache.clear(this.getKey(key));
	}

	async setCache(key: string | string[], value: unknown, expire?: number): Promise<typeof value> {
		await this.cache.set(this.getKey(key), value, expire);
		return value;
	}
}
