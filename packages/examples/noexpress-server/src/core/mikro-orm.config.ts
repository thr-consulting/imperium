import debug from 'debug';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
import {entities} from '@imperium/example-domain';
import type {Options} from '@mikro-orm/core';

const d = debug('imperium.example.server.mikro-orm.config');

export const mikroOrmConfig: Options = {
	entities: Object.values(entities),
	clientUrl: process.env.POSTGRESQL_URL,
	type: 'postgresql',
	driver: PostgreSqlDriver,
	debug: process.env.POSTGRESQL_LOGGING === 'true',
	discovery: {
		disableDynamicFileAccess: true,
	},
};
