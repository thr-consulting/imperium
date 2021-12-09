import type {AuthenticatedUser} from '@imperium/connector';
import debug from 'debug';
import type {PermissionLookup} from '@imperium/authorization';

const d = debug('imperium.examples.domain.auth.DomainAuthSelector');

export const permissionLookup: PermissionLookup<AuthenticatedUser> = async ({permission, data, id, authorization}) => {
	d(id);
	d(permission);
	d(data);
	// todo I want context here
	return true;
};
