import type {AuthorizationCache} from '@imperium/authorization';
import {env} from '@thx/env';
import debug from 'debug';
import Dexie from 'dexie';
import {defaults} from './defaults';

const d = debug('imperium.auth-client.DexieCache');

const staleMs = env.getInt('AUTH_PERMISSION_CACHE_EXPIRES', defaults.IMP_PERMISSION_CACHE_EXPIRES) * 1000;

interface CacheItem {
	key: string;
	timestamp: number;
	value: string;
}

export class DexieCache implements AuthorizationCache {
	#cache: Dexie;

	public constructor() {
		this.#cache = new Dexie('auth');
	}

	async open() {
		// If the dexie cache isn't open
		if (!this.#cache.isOpen()) {
			// Configure cache stores
			this.#cache.version(1).stores({
				auth: '&key,timestamp',
			});
		}

		// Delete cached entries older than stale age
		await this.#cache
			.table('auth')
			.where('timestamp')
			.below(Date.now() - env.getInt('IMP_PERMISSION_CACHE_EXPIRES', defaults.IMP_PERMISSION_CACHE_EXPIRES) * 1000)
			.delete();
	}

	async exists(key: string): Promise<boolean> {
		const item = (await this.#cache.table('auth').get(key)) as CacheItem | undefined;
		return !!(item && Date.now() - item.timestamp < staleMs);
	}

	async get(key: string): Promise<any> {
		const item = (await this.#cache.table('auth').get(key)) as CacheItem | undefined;
		if (item && Date.now() - item.timestamp < staleMs) {
			d(`Cache hit: ${key} -> ${item.value}`);
			return item.value;
		}
		return null;
	}

	async set(key: string, data: any): Promise<any> {
		d(`Cache write: ${key} -> ${data}`);
		const obj = {key, value: data, timestamp: Date.now()};
		await this.#cache.table('auth').put(obj, data);
		return data;
	}

	async clearAll(): Promise<boolean> {
		await this.#cache.table('auth').clear();
		return true;
	}

	async clearPrefix(prefix: string): Promise<boolean> {
		const toDelete = await this.#cache.table('auth').where('key').startsWith(prefix).primaryKeys();
		await this.#cache.table('auth').bulkDelete(toDelete);
		return true;
	}
}
