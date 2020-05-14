import type {ContextManager} from './ContextManager';

export class Auth<C extends ContextManager<any, any> = any> {
	private _context: C;
	public id?: string;

	constructor(params: {id?: string}, ctx: C) {
		this._context = ctx;
		this.id = params.id;
	}

	hasPermission(perms: string | string[]) {
		return this.domain.hasPermission(perms, this.id);
	}

	async setCache(key: string | string[], allowed: boolean, expire?: number) {
		// return this.domain.setCache(key, allowed, expire);
	}

	async getCache(key: string | string[]) {
		// return this.domain.getCache(key);
		return false;
	}

	async invalidateCache(key: string | string[]) {
		// await this.domain.invalidateCache(key);
	}
}

// import {DefaultAuthImplementation} from './DefaultAuthImplementation';
//
// export interface AuthImplementation {
// 	hasPermission: (perms: string | string[], id?: string) => boolean;
// 	setCache: (key: string | string[], allowed: boolean, expire?: number) => Promise<typeof allowed>;
// 	getCache: (key: string | string[]) => Promise<boolean | null>;
// 	invalidateCache: (key: string | string[]) => Promise<void>;
// }
//
// export class Auth {
// 	public readonly id?: string;
// 	private readonly domain: AuthImplementation;
//
// 	constructor(param?: {domain?: AuthImplementation; id?: string}) {
// 		this.id = param?.id;
// 		this.domain = param?.domain || new DefaultAuthImplementation();
// 	}
//
// 	hasPermission(perms: string | string[]) {
// 		return this.domain.hasPermission(perms, this.id);
// 	}
//
// 	async setCache(key: string | string[], allowed: boolean, expire?: number) {
// 		return this.domain.setCache(key, allowed, expire);
// 	}
//
// 	async getCache(key: string | string[]) {
// 		return this.domain.getCache(key);
// 	}
//
// 	async invalidateCache(key: string | string[]) {
// 		await this.domain.invalidateCache(key);
// 	}
// }
