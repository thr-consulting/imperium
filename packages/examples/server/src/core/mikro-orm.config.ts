import type {Options} from '@mikro-orm/core';
import {PostgreSqlDriver} from '@mikro-orm/postgresql';
// import {TsMorphMetadataProvider} from '@mikro-orm/reflection';
// import path from 'path';
import {getInstalledPathSync} from 'get-installed-path';
import {entities} from '@imperium/example-domain';

// const domainPath = getInstalledPathSync('@imperium/example-domain', {local: true, paths: process.mainModule.paths});

export const mikroOrmConfig: Options = {
	// metadataProvider: TsMorphMetadataProvider,
	// entities: [path.resolve(domainPath, 'dist')],
	// entitiesTs: [path.resolve(domainPath, 'src')],
	entities: Object.values(entities),
	clientUrl: process.env.POSTGRESQL_URL,
	type: 'postgresql',
	driver: PostgreSqlDriver,
	debug: process.env.POSTGRESQL_LOGGING === 'true',
	// discovery: {
	// 	disableDynamicFileAccess: true,
	// },
	// ...(process.env.POSTGRESQL_SSL_CA ? {ssl: {ca: process.env.POSTGRESQL_SSL_CA}} : {}),
};
