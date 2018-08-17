import debug from 'debug';
import {schema, resolvers} from './server/graphql';
import models from './server/models';

const d = debug('imperium.proj.server.user.startup');

export default function() {
	return {
		models,
		schema,
		resolvers,
		async startup(context) {
			const {Users} = context.models;

			if (!await Users.getByEmail('darkadept@durbn.net')) {
				d('Creating default user');
				await Users.createUser(
					{
						email: 'darkadept@durbn.net',
						password: 'sysadmin',
						roles: ['sysadmin'],
					},
					{
						firstName: 'System',
						lastName: 'Administrator',
					},
					{
						verified: true,
					},
				);
			}
		},
	};
}
