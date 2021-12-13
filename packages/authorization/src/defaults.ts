import {Environment} from '@thx/env';

Environment.addDefaults({
	AUTH_PERMISSION_CACHE_EXPIRES: 3600, // seconds
	AUTH_PERMISSION_DATALOADER_LRU_MAX: 500,
	AUTH_PERMISSION_DATALOADER_LRU_MAXAGE: 60, // seconds
});
