import type {AuthenticatedUser} from '@imperium/connector';
import debug from 'debug';
import type {AbstractAuthSelector} from './AbstractAuthSelector';
import {AsyncAuthorizationResult, AsyncHasAccessOptions} from './AsyncAuthorizationResult';
import {AuthLevel} from './AuthLevel';
import {generateCacheKey} from './generateCacheKey';

const d = debug('imperium.authorization.Authorization');

interface AuthorizationPrepareParams<User> {
	getUserById: (id: string) => Promise<User | undefined>;
	createUser: (data: unknown) => User;
	setCache: (key: string, data: unknown, expire?: number) => Promise<typeof data>;
	getCache: (key: string) => Promise<unknown>;
	ctx: unknown;
}

export class Authorization<User> {
	public readonly authenticatedUser?: AuthenticatedUser;
	public readonly id?: string;
	public user: User | undefined;
	private prepared: boolean;
	private setCache?: (key: string, data: unknown, expire?: number) => Promise<typeof data>;
	private getCache?: (key: string) => Promise<unknown>;
	private ctx?: unknown;
	#session: string;

	public constructor(authenticatedUser?: AuthenticatedUser) {
		this.authenticatedUser = authenticatedUser;
		this.id = authenticatedUser?.auth?.id;
		this.prepared = false;
		this.#session = '';
	}

	public async prepare({getUserById, createUser, getCache, setCache, ctx}: AuthorizationPrepareParams<User>) {
		if (this.prepared) throw new Error('Cannot prepare Authorization instance twice');
		this.prepared = true;

		this.ctx = ctx;
		this.setCache = setCache;
		this.getCache = getCache;
		if (this.id) {
			const u = await this.getCache(`auth:user:${this.id}`);
			if (u) {
				this.user = createUser(u);
			} else {
				this.user = await getUserById(this.id);
				this.setCache(`auth:user:${this.id}`, this.user, 60);
			}
		}

		// @ts-ignore
		// eslint-disable-next-line no-underscore-dangle
		this.#session = this.ctx.__session;
	}

	public get session() {
		return this.#session;
	}

	public async getLevel(selector: AbstractAuthSelector): Promise<AuthLevel> {
		const cacheKey = generateCacheKey(selector, this.id);
		if (this.getCache) {
			const lvlRaw = (await this.getCache(cacheKey)) as string | undefined;
			if (lvlRaw) {
				return AuthLevel.fromString(lvlRaw);
			}
		}
		const level = await selector.getLevel(this.ctx, this.user);
		if (this.setCache) {
			await this.setCache(cacheKey, level.toString(), 60);
		}
		return level;
	}

	public hasAccess(level: AuthLevel, selector: AbstractAuthSelector, opts?: AsyncHasAccessOptions): AsyncAuthorizationResult {
		const selectorLevel = this.getLevel(selector);
		return new AsyncAuthorizationResult(selectorLevel, level, opts);
	}
}
