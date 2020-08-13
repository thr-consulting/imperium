import {entities} from '@imperium/example-domain';
import type {Options} from 'mikro-orm';

export const mikroOrmConfig: Options = {
	entities: Object.values(entities),
	clientUrl: process.env.POSTGRESQL_URL,
	type: 'postgresql',
	// logging: process.env.POSTGRESQL_LOGGING === 'true',
	// ...(process.env.POSTGRESQL_SSL_CA ? {ssl: {ca: process.env.POSTGRESQL_SSL_CA}} : {}),
};
