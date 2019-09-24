import debug from 'debug';
import {ImperiumServer, ModelsMap} from '@imperium/core';
import permissions from '../permissions';

const d = debug('imperium.auth.startup');

export default async function startup(server: ImperiumServer) {
	const {Role} = server.initialContext.models;
	const {SYSADMIN} = permissions;

	if (!(await Role.findOne().byName(SYSADMIN))) {
		d('Creating sysadmin role');
		const SysadminRole = new Role({name: SYSADMIN, permissions: [SYSADMIN]});
		await SysadminRole.save();
	}
}
