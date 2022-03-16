import 'setimmediate';

export {Authorization} from './Authorization';
export type {Permission, JsonArray, JsonValue, JsonObject, PermissionLookup, PermissionLookupOpts, AuthorizationCache, PermissionKey} from './types';
export {noPermissionLookup} from './noPermissionLookup';
export {keysSplitAndSort} from './keysSplitAndSort';

export const defaults = {
	IMP_PERMISSION_CACHE_EXPIRES: 3600, // seconds
	IMP_PERMISSION_DATALOADER_LRU_MAX: 500, // number of entries
	IMP_PERMISSION_DATALOADER_LRU_MAXAGE: 60, // seconds
};
