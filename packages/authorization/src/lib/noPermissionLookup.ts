import type {AuthenticationBase, PermissionLookupOpts} from '../types';

export async function noPermissionLookup<Extra extends AuthenticationBase>(opts: PermissionLookupOpts<Extra>) {
	return opts.keys.map(() => false);
}
