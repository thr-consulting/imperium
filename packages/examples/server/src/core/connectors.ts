import {Connector} from '@imperium/context-manager';
import SharedCache from '@thx/sharedcache';
import debug from 'debug';
import {ConnectionOptions, createConnection} from 'typeorm';
import redis from 'redis';
import {typeormEntities} from '../domain3';

const d = debug('imperium.example.server.connectors');

/*
	Connectors are a way to interface with databases and other persistence layers.

	The only requirement for a connector is that each key requires fields of connect and close.
 */

export const connectors = new Connector({
	mongo: {
		async connect() {
			return 5;
		},
		async close() {
			d('Arbitrary closing connector debug statement');
		},
	},
	pg: {
		async connect() {
			const postgresOptions: ConnectionOptions = {
				type: 'postgres',
				url: process.env.POSTGRESQL_URL,
				synchronize: process.env.NODE_ENV === 'development',
				entities: Object.values(typeormEntities),
				// subscribers,
				...(process.env.POSTGRESQL_SSL_CA ? {ssl: {ca: process.env.POSTGRESQL_SSL_CA}} : {}),
			};

			return createConnection(postgresOptions);
		},
		async close(pg) {
			await pg.close();
		},
	},
	sharedCache: {
		async connect() {
			const r = redis.createClient({
				host: process.env.REDIS_HOST,
				port: parseInt(process.env.REDIS_PORT || '6379', 10),
				db: parseInt(process.env.REDIS_DB || '0', 10),
			});
			return new SharedCache({
				redis: r,
			});
		},
		async close() {},
	},
});
