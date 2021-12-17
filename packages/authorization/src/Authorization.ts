import {Environment} from '@thx/env';
import DataLoader from 'dataloader';
import debug from 'debug';
import LruCache from 'lru-cache';
import {compress, decompress} from 'lzbase62';
import {keysSplitAndSort} from './keysSplitAndSort';
import {noPermissionLookup} from './noPermissionLookup';
import type {AuthorizationCache, JsonValue, Permission, PermissionKey, PermissionLookup} from './types';

const d = debug('imperium.authorization.Authorization');

interface AuthorizationConstructor<ExtraData = any> {
	id?: string;
	lookup?: PermissionLookup<ExtraData>;
	extraData?: ExtraData;
}

/**
 * Converts a PermissionKey object to a string
 * @param id
 * @param permission
 * @param data
 */
function keyToString({id, permission, data}: PermissionKey): string {
	if (permission.length <= 0) throw new Error("Can't make key for empty permission");
	const encodedData = compress(JSON.stringify(data));
	const dataStr = data ? `:${encodedData}` : '';
	return `authorization:${id || 'notauth'}:${permission}${dataStr}`;
}

/**
 * Converts a string to a PermissionKey object
 * @param str
 */
function stringToKey(str: string): PermissionKey {
	const c = str.split(':');
	if (c.length === 4) {
		return {
			id: c[1],
			permission: c[2],
			data: JSON.parse(decompress(c[3])),
		};
	}
	if (c.length === 3) {
		return {
			id: c[1],
			permission: c[2],
		};
	}
	throw new Error('String not a valid permission key');
}

export class Authorization<ExtraData = any, Context = any> {
	public readonly id?: string;
	public readonly extraData?: ExtraData;
	#lookup: PermissionLookup<ExtraData> = noPermissionLookup;
	private readonly dataloader: DataLoader<string, boolean>;
	private readonly lrucache: LruCache<string, boolean>;
	private ctx?: Context;
	#cache?: AuthorizationCache;

	public constructor(opts?: AuthorizationConstructor<ExtraData>) {
		this.id = opts?.id;
		this.extraData = opts?.extraData;
		if (opts?.lookup) this.#lookup = opts.lookup;

		// d(`AUTH_PERMISSION_CACHE_EXPIRES: ${Environment.getInt('AUTH_PERMISSION_CACHE_EXPIRES')}`);
		// d(`AUTH_PERMISSION_DATALOADER_LRU_MAXAGE: ${Environment.getInt('AUTH_PERMISSION_DATALOADER_LRU_MAXAGE')}`);

		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const thisAuthorization = this;
		this.lrucache = new LruCache({
			max: Environment.getInt('AUTH_PERMISSION_DATALOADER_LRU_MAX'),
			maxAge: Environment.getInt('AUTH_PERMISSION_DATALOADER_LRU_MAXAGE') * 1000,
		});
		// @ts-expect-error
		this.lrucache.delete = this.lrucache.del;
		// @ts-expect-error
		this.lrucache.clear = this.lrucache.reset;
		this.dataloader = new DataLoader(
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
									await thisAuthorization.cache?.set(keyWrapperArr[index].key, value, Environment.getInt('AUTH_PERMISSION_CACHE_EXPIRES'));
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
			// @ts-expect-error
			{cacheMap: this.lrucache},
		);
	}

	/**
	 * Query whether a permission (with data and current user) is allowed
	 * @param permission
	 * @param data
	 */
	public async can(permission: Permission, data?: JsonValue): Promise<boolean> {
		// Permission is an array of string
		if (Array.isArray(permission)) {
			const keyStrings = permission.map(perm => {
				return Authorization.keyToString({
					id: this.id,
					permission: perm,
					data,
				});
			});
			const results = await this.dataloader.loadMany(keyStrings);

			// Logical AND the results of all the permissions to return a single result
			return results.reduce<boolean>((memo, v) => {
				if (v instanceof Error) return false;
				return memo && v;
			}, true);
		}

		// Permission is a single string
		return this.dataloader.load(
			Authorization.keyToString({
				permission,
				id: this.id,
				data,
			}),
		);
	}

	public set cache(cache: AuthorizationCache | undefined) {
		this.#cache = cache;
	}

	public get cache() {
		return this.#cache;
	}

	public resetDataloader() {
		this.dataloader.clearAll();
	}

	public set lookup(lookup: PermissionLookup<ExtraData> | undefined) {
		this.#lookup = lookup || noPermissionLookup;
	}

	public get lookup() {
		return this.#lookup;
	}

	public set context(context: Context | undefined) {
		this.ctx = context;
	}

	public get context() {
		return this.ctx;
	}

	static keyToString = keyToString;
	static stringToKey = stringToKey;
}
