import debug from 'debug';
import type {Options} from '@mikro-orm/core';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
// import path from 'path';
// import {getInstalledPathSync} from 'get-installed-path';
import {entities} from '@imperium/example-domain';

const d = debug('imperium.example.server.mikro-orm.config');

// const domainPath = getInstalledPathSync('@imperium/example-domain', {local: true, paths: process.mainModule.paths});
// const a = path.relative(process.cwd(), path.join(domainPath, 'src'));

export const mikroOrmConfig: Options = {
	entities: Object.values(entities),
	clientUrl: process.env.POSTGRESQL_URL,
	type: 'postgresql',
	driver: PostgreSqlDriver,
	debug: process.env.POSTGRESQL_LOGGING === 'true',
	discovery: {
		disableDynamicFileAccess: true,
	},
	// ...(process.env.POSTGRESQL_SSL_CA ? {ssl: {ca: process.env.POSTGRESQL_SSL_CA}} : {}),
};
