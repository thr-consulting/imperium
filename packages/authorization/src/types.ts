import type {Authorization} from './Authorization';

export interface IndexedValue<Value> {
	index: number;
	value: Value;
}

export type JsonValue = string | number | boolean | null | JsonValue[] | {[key: string]: JsonValue};

/**
 * A Permission is either a string or a string and Json data.
 */
export type Permission = string;
export interface PermissionWithData {
	permission: string;
	data?: JsonValue;
}
export type Permissions = Permission | PermissionWithData | (Permission | PermissionWithData)[];

export type WithKey<T extends object> = T & {id: string | null};

export interface PermissionLookupOpts<Extra extends AuthenticationBase> {
	keys: readonly WithKey<PermissionWithData>[];
	authorization: Authorization<Extra>;
}

export type PermissionLookup<Extra extends AuthenticationBase> = (opts: PermissionLookupOpts<Extra>) => Promise<boolean[]>;

/**
 * A simple cache interface (used for client side caching)
 */
export interface AuthorizationCache {
	get(key: string): Promise<any>;
	set(key: string, data: any, expire?: number): Promise<any>;
	exists(key: string): Promise<boolean>;
}

export interface AuthenticationBase {
	auth?: {
		id?: string;
	};
}

export interface AuthenticationRequest extends AuthenticationBase {
	hostname?: string;
	ip?: string;
	headers?: {
		[key: string]: string;
	};
}

export interface AuthenticationToken extends AuthenticationBase {
	getToken: () => Promise<string | null>;
}
