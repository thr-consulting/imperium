import {SYSADMIN} from '@thx/router';
import debug from 'debug';

const d = debug('imperium.auth.server.startup');

export default async function startup(ctx) {
	d('Auth startup');
	const {Auth} = ctx.models;

	// d(Auth);

	if (!await Auth.getByName('sysadmin')) {
		await Auth.createRole('sysadmin', [SYSADMIN]);
	}

	// const x = await Auth.signIn('darkadept@durbn.net', 'sysadmin');
	// d(x);
}
