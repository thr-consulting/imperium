import {name} from '../../package.json';
import models from './models';
import {schema, resolvers} from './graphql';
import startup from './startup';

export default function ImperiumUserModule() {
	return {
		name,
		models,
		schema,
		resolvers,
		startup,
		options() {
			return {
				userSysadminName: process.env.USER_SYSADMIN_NAME || 'sysadmin',
				userSysadminEmail: process.env.USER_SYSADMIN_EMAIL || 'sysadmin@example.com',
				userSysadminPassword: process.env.USER_SYSADMIN_PASSWORD || 'password',
			};
		},
	};
}
