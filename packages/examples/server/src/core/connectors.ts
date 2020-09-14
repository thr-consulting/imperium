import {Connector} from '@imperium/connector';
import SharedCache from '@thx/sharedcache';
import debug from 'debug';
import {MikroORM} from '@mikro-orm/core';
import redis from 'redis';
import {PubSub} from 'apollo-server-express';
import {mikroOrmConfig} from './mikro-orm.config';
import {environment} from './environment';

const d = debug('imperium.examples.server.connectors');
const env = environment();

/*
	Connectors are a way to interface with databases and other persistence layers.

	The only requirement for a connector is that each key requires a connect() method.
 */

export const connectors = new Connector({
	basicConnector: {
		async connect() {
			return 5;
		},
	},
	orm: {
		async connect() {
			return MikroORM.init(mikroOrmConfig);
		},
		async close(orm) {
			await orm.close(true);
		},
	},
	sharedCache: {
		async connect() {
			const redisClient = redis.createClient({
				host: env.redisHost,
				port: env.redisPort,
				db: env.redisDb,
			});
			return new SharedCache({
				redis: redisClient,
			});
		},
	},
	pubsub: {
		async connect() {
			return new PubSub();
		},
	},
});
