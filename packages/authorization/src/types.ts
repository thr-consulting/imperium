import type {Authorization} from './Authorization';

export type JsonValue = string | number | boolean | null | JsonValue[] | {[key: string]: JsonValue};

export interface JsonObject {
	[k: string]: JsonValue;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JsonArray extends Array<JsonValue> {}

export type Permission = string | string[];

export interface PermissionLookupOpts<ExtraData = any> {
	id?: string;
	permission: Permission;
	data?: JsonValue;
	authorization: Authorization<ExtraData>;
}

export type PermissionLookup<ExtraData = any> = (opts: PermissionLookupOpts<ExtraData>) => Promise<boolean>;

export interface AuthorizationCache {
	get(key: string): Promise<any>;
	set(key: string, data: any, expire?: number): Promise<any>;
	exists(key: string): Promise<boolean>;
}
