import debug from 'debug';
import permissions from '../common/permissions';

const d = debug('imperium.auth.server.startup');

export default async function startup(ctx) {
	d('Auth startup');
	const {Auth} = ctx.models;
	const {SYSADMIN} = permissions;

	if (!await Auth.getByName(SYSADMIN)) {
		await Auth.createRole(SYSADMIN, [SYSADMIN]);
	}

	// const x = await Auth.signIn('darkadept@durbn.net', 'sysadmin');
	// d(x);
}
