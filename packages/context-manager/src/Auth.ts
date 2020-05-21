/* eslint-disable react/static-property-placement */
import intersection from 'lodash/intersection';
import memoize from 'lodash/memoize';

export interface AuthAccessor {
	getPermissions(id: string, ctx: any): Promise<string[]>; // TODO any context
	setCache(key: string | string[], value: any, expire?: number): Promise<typeof value>;
	getCache(key: string | string[]): Promise<any>;
	invalidateCache(key: string | string[]): Promise<void>;
}

export interface AuthData {
	auth?: {
		id?: string;
	};
}

interface CheckPermissionParams {
	id?: string;
	perms: string | string[];
	accessor?: AuthAccessor;
	context?: any; // TODO any
}

export class Auth<C = any, T extends AuthData = AuthData> {
	public readonly data?: T;

	private context?: C;
	private authAccessor?: AuthAccessor;
	private readonly checkPermissions: (params: CheckPermissionParams) => Promise<boolean>;

	constructor(data?: T) {
		this.data = data;
		this.checkPermissions = memoize(async ({id, perms, accessor, context}: CheckPermissionParams) => {
			if (!id || !accessor || !context) return false;
			const permissions = await accessor.getPermissions(id, context);
			const permsArray = perms instanceof Array ? perms : [perms];
			return intersection(permsArray, permissions).length === permsArray.length;
		});
	}

	setAccessor(authAccessor: AuthAccessor, context: any) {
		// TODO any
		this.authAccessor = authAccessor;
		this.context = context;
	}

	get id() {
		return this.data?.auth?.id;
	}

	async hasPermission(perms: string | string[]) {
		return this.checkPermissions({id: this.data?.auth?.id, perms, accessor: this.authAccessor});
	}

	async setCache(key: string | string[], allowed: boolean, expire?: number) {
		if (!this.authAccessor) return allowed;
		return this.authAccessor.setCache(key instanceof Array ? [...key, 'authCache'] : [key, 'authCache'], allowed, expire);
	}

	async getCache(key: string | string[]) {
		if (!this.authAccessor) return null;
		return this.authAccessor.getCache(key instanceof Array ? [...key, 'authCache'] : [key, 'authCache']);
	}

	async invalidateCache(key: string | string[]) {
		if (this.authAccessor) {
			await this.authAccessor.invalidateCache(key);
		}
	}
}
