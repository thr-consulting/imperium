import debug from 'debug';
import permissions from './permissions';

const d = debug('imperium.auth.server.startup');

export default async function startup(ctx) {
	d('Auth startup');
	const {Role} = ctx.models;
	const {SYSADMIN} = permissions;

	if (!await Role.findOne().byName(SYSADMIN)) {
		const SysadminRole = new Role({name: SYSADMIN, permissions: [SYSADMIN]});
		await SysadminRole.save();
	}
}
