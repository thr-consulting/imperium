import debug from 'debug';
import {ImperiumServer, IModel} from '@imperium/core';
import {SYSADMIN} from '../../permissions';

const d = debug('imperium.auth.startup');

export default async function startup(server: ImperiumServer) {
	const {Role} = server.initialContext.models;

	if (!(await Role.findOne().byName(SYSADMIN))) {
		d('Creating sysadmin role');
		const SysadminRole = new Role({name: SYSADMIN, permissions: [SYSADMIN]});
		await SysadminRole.save();
	}
}
