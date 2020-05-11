import {Connector} from '@imperium/context-manager';
import debug from 'debug';
import {ConnectionOptions, createConnection} from 'typeorm';
import {typeormEntities} from './domain3';

const d = debug('imperium.example-standalone.connectors');

// Create connectors instance
// Each key requires fields of connect and close
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
});
