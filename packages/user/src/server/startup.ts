import debug from 'debug';
import {ImperiumServer} from '@imperium/core';
import {permissions} from '@imperium/auth/server';
import {IUser} from './models/User';

const d = debug('imperium.user.startup');

export default async function startup(server: ImperiumServer) {
	const {User} = server.initialContext.models;
	const user = await User.findOne().byEmail('sysadmin@example.com');
	if (!user) {
		d('Creating sysadmin user');
		const sysadmin = new User() as IUser;
		sysadmin.name = server.options.userSysadminName;
		sysadmin.email = server.options.userSysadminEmail;
		d('User not found');
	}
}
