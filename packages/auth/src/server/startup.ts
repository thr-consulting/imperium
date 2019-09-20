import debug from 'debug';
import {ImperiumServer} from '@imperium/core';
import permissions from '../permissions';

const d = debug('imperium.auth.startup');

export default async function startup(server: ImperiumServer) {
	d('Auth startup');
	const {Role} = server.initialContext.models;
	const {SYSADMIN} = permissions;

	if (!(await Role.findOne().byName(SYSADMIN))) {
		const SysadminRole = new Role({name: SYSADMIN, permissions: [SYSADMIN]});
		await SysadminRole.save();
	}
}
