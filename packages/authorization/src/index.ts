import 'setimmediate';

export {Authorization} from './Authorization';
export type {Permission, JsonArray, JsonValue, JsonObject, PermissionLookup, PermissionLookupOpts, AuthorizationCache, PermissionKey} from './types';
export {noPermissionLookup} from './noPermissionLookup';
export {keysSplitAndSort} from './keysSplitAndSort';

export const defaults = {
	AUTH_PERMISSION_CACHE_EXPIRES: 3600, // seconds
	AUTH_PERMISSION_DATALOADER_LRU_MAX: 500,
	AUTH_PERMISSION_DATALOADER_LRU_MAXAGE: 60, // seconds
};
