import debug from 'debug';
import {entities} from '@imperium/example-domain';
import type {Options} from '@mikro-orm/core';

const d = debug('imperium.example.server.mikro-orm.config');

export const mikroOrmConfig: Options = {
	entities: Object.values(entities),
	clientUrl: process.env.POSTGRESQL_URL,
	type: 'postgresql',
	debug: process.env.POSTGRESQL_LOGGING === 'true',
	discovery: {
		disableDynamicFileAccess: true,
	},
	driverOptions:
		process.env.POSTGRESQL_SSL === 'true'
			? {
					connection: {
						ssl: process.env.POSTGRESQL_REJECT_UNAUTHORIZED
							? {
									rejectUnauthorized: process.env.POSTGRESQL_REJECT_UNAUTHORIZED === 'true',
							  }
							: true,
					},
			  }
			: {},
};
