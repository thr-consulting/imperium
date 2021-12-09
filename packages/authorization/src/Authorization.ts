import debug from 'debug';
import {compress} from 'lzbase62';
import {Environment} from '@thx/env';
import type {AuthorizationCache, JsonValue, Permission, PermissionLookup} from './types';
import {noPermissionLookup} from './noPermissionLookup';

const d = debug('imperium.authorization.Authorization');

interface AuthorizationConstructor<ExtraData = any> {
	id?: string;
	lookup?: PermissionLookup<ExtraData>;
	extraData?: ExtraData;
}

function makeKey(id: string | undefined, permission: string, data?: JsonValue) {
	if (permission.length <= 0) throw new Error("Can't make key for empty permission");
	const encodedData = compress(JSON.stringify(data));
	const dataStr = data ? `:${encodedData}` : '';
	return `authorization:${id || 'notauth'}:${permission}${dataStr}`;
}

export class Authorization<ExtraData = any> {
	public readonly id?: string;
	public readonly extraData?: ExtraData;
	private readonly lookup: PermissionLookup<ExtraData> = noPermissionLookup;
	private cache?: AuthorizationCache;

	public constructor(opts?: AuthorizationConstructor<ExtraData>) {
		this.id = opts?.id;
		this.extraData = opts?.extraData;
		if (opts?.lookup) this.lookup = opts.lookup;
	}

	private async doLookup(permission: Permission, data?: JsonValue): Promise<boolean> {
		return this.lookup({
			authorization: this,
			id: this.id, // who
			permission, // what
			data, // about
		});
	}

	private async canSingle(permission: string, data?: JsonValue): Promise<boolean> {
		if (this.cache) {
			const cacheKey = makeKey(this.id, permission, data);
			if (await this.cache.exists(cacheKey)) {
				return this.cache.get(cacheKey);
			}
			const lookupResult = await this.doLookup(permission, data);
			await this.cache.set(cacheKey, lookupResult, Environment.getInt('AUTH_PERMISSION_CACHE_EXPIRES'));
			return lookupResult;
		}
		return this.doLookup(permission, data);
	}

	public async can(permission: Permission, data?: JsonValue): Promise<boolean> {
		if (Array.isArray(permission)) {
			return (await Promise.all(permission.map(perm => this.canSingle(perm, data)))).reduce((memo, v) => memo && v, true);
		}
		return this.canSingle(permission, data);
	}

	public setCache(cache: AuthorizationCache) {
		this.cache = cache;
	}
}
