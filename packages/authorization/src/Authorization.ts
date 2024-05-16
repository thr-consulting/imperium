import {env} from '@thx/env';
import DataLoader from 'dataloader';
import debug from 'debug';
import LruCache from 'lru-cache';
import {defaults} from './defaults';
import {keyToString} from './lib/keyToString';
import {keysSplitAndSort} from './lib/keysSplitAndSort';
import {noPermissionLookup} from './lib/noPermissionLookup';
import {stringToKey} from './lib/stringToKey';
import type {AuthenticationBase, AuthorizationCache, Permissions, PermissionLookup} from './types';

const d = debug('imperium.authorization.Authorization');

interface AuthorizationConstructor<Extra extends AuthenticationBase> {
	lookup?: PermissionLookup<Extra>;
	dataloaderCache?: boolean; // Defaults to true
	dataloaderBatch?: boolean; // Defaults to true
	authorizationCache?: AuthorizationCache;
	extra?: Extra;
}

export class Authorization<Extra extends AuthenticationBase, Context = any> {
	#lookup: PermissionLookup<Extra> = noPermissionLookup;
	readonly #dataloader: DataLoader<string, boolean>;
	readonly #lrucache: LruCache<string, boolean>;
	#cache?: AuthorizationCache;
	readonly #extra?: Extra;
	private ctx?: Context;

	public constructor(opts?: AuthorizationConstructor<Extra>) {
		const {authorizationCache, dataloaderCache, dataloaderBatch, lookup, extra} = opts || {};

		if (lookup) this.#lookup = lookup;
		if (authorizationCache) this.#cache = authorizationCache;
		this.#extra = extra;

		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const thisAuthorization = this;

		// Create a Least Recently Used cache for dataloader
		this.#lrucache = new LruCache({
			max: env.getInt('IMP_PERMISSION_DATALOADER_LRU_MAX', defaults.IMP_PERMISSION_DATALOADER_LRU_MAX),
			ttl: env.getInt('IMP_PERMISSION_DATALOADER_LRU_MAXAGE', defaults.IMP_PERMISSION_DATALOADER_LRU_MAXAGE) * 1000,
		});
		this.#dataloader = new DataLoader(
			async (keys: readonly string[]): Promise<boolean[]> => {
				return keysSplitAndSort(
					keys,
					async keyString => {
						if (thisAuthorization.cache) {
							if (await thisAuthorization.cache.exists(keyString)) {
								const cachedValue = await thisAuthorization.cache.get(keyString);
								if (cachedValue === true || cachedValue === false) {
									return cachedValue;
								}
							}
						}
						return null;
					},
					async keyWrapperArr => {
						const permissionKeys = keyWrapperArr.map(v => Authorization.stringToKey(v.key));
						const valuesFromLookup = await thisAuthorization.#lookup({
							authorization: thisAuthorization,
							keys: permissionKeys,
						});

						if (thisAuthorization.cache) {
							await Promise.all(
								valuesFromLookup.map(async (value, index) => {
									await thisAuthorization.cache?.set(
										keyWrapperArr[index].key,
										value,
										env.getInt('IMP_PERMISSION_CACHE_EXPIRES', defaults.IMP_PERMISSION_CACHE_EXPIRES),
									);
								}),
							);
						}

						return valuesFromLookup.map((value, index) => {
							return {
								index: keyWrapperArr[index].index,
								value,
							};
						});
					},
				);
			},
			{
				// @ts-expect-error TODO check to make sure the new lru-cache suits dataloader
				cacheMap: this.#lrucache,
				cache: dataloaderCache,
				batch: dataloaderBatch,
			},
		);
	}

	/**
	 * Query whether a permission (with data and current user) is allowed
	 * @param permissions
	 * @param data
	 */
	public async can(permissions: Permissions, logicalOperation: 'AND' | 'OR' = 'AND'): Promise<boolean> {
		// Permission is an array of strings
		if (Array.isArray(permissions)) {
			const keyStrings = permissions.map(perm => {
				return Authorization.keyToString({
					id: this.#extra?.auth?.id || null,
					permission: typeof perm === 'string' ? perm : perm.permission,
					data: typeof perm !== 'string' ? perm.data : undefined,
				});
			});
			const results = await this.#dataloader.loadMany(keyStrings);

			// Logical AND
			if (logicalOperation === 'AND') {
				return results.reduce<boolean>((memo, v) => {
					if (!memo || v instanceof Error) return false;
					return v;
				}, true);
			}

			// Logical OR
			return results.reduce<boolean>((memo, v) => {
				if (memo || (!(v instanceof Error) && v)) return true;
				return false;
			}, false);
		}

		// Permission is a single string
		return this.#dataloader.load(
			Authorization.keyToString({
				permission: typeof permissions === 'string' ? permissions : permissions.permission,
				id: this.#extra?.auth?.id || null,
				data: typeof permissions !== 'string' ? permissions.data : undefined,
			}),
		);
	}

	public set cache(cache: AuthorizationCache | undefined) {
		this.#cache = cache;
	}

	public get cache() {
		return this.#cache;
	}

	public set lookup(lookup: PermissionLookup<Extra> | undefined) {
		this.#lookup = lookup || noPermissionLookup;
	}

	public get lookup() {
		return this.#lookup;
	}

	public get extra() {
		return this.#extra;
	}

	static keyToString = keyToString;
	static stringToKey = stringToKey; // Needed by @imperium/auth-server
}
