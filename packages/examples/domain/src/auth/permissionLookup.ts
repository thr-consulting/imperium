import type {AuthenticatedUser} from '@imperium/connector';
import debug from 'debug';
import type {PermissionLookup} from '@imperium/authorization';
import type {Context} from '../core/Context';

const d = debug('imperium.examples.domain.auth.DomainAuthSelector');

export const permissionLookup: PermissionLookup<AuthenticatedUser> = async opts => {
	d(`Doing difficult permission lookup from db: ${JSON.stringify(opts.keys)}`);

	const ctx = opts.authorization.context as Context;
	// const y = await ctx.authController.getSecureData();
	// d(y);

	return opts.keys.map(v => {
		if (v.data) {
			return !!v.data.force;
		}
		return true;
	});
	// todo I want context here
};
