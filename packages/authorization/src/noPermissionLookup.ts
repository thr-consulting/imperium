import type {PermissionLookup} from './types';

export const noPermissionLookup: PermissionLookup = async () => {
	return false;
};
