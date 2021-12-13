import type {PermissionLookup} from './types';

export const noPermissionLookup: PermissionLookup = async opts => {
	return opts.keys.map(() => false);
};
