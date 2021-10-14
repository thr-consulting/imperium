import {Connectors, Connector} from '@imperium/connector';
import {MikroORM} from '@mikro-orm/core';
import {Environment} from '@thx/env';
import SharedCache from '@thx/sharedcache';
import {PubSub} from 'apollo-server-express';
import debug from 'debug';
import redis from 'redis';
import {mikroOrmConfig} from './mikro-orm.config';

const d = debug('imperium.examples.standalone.connectors');

/*
	Connectors are a way to interface with databases and other persistence layers.
 */

export const connectors = new Connectors([
	new Connector<number>('basicConnector', {
		async connect() {
			return 5;
		},
		async isReady() {
			return true;
		},
	}),
	new Connector<MikroORM>('orm', {
		async connect() {
			return MikroORM.init(mikroOrmConfig);
		},
		async close(orm) {
			await orm.close(true);
		},
		async isReady(orm) {
			return orm.isConnected();
		},
	}),
	new Connector<SharedCache>('sharedCache', {
		async connect() {
			const redisClient = redis.createClient({
				host: Environment.getString('REDIS_HOST'),
				port: Environment.getInt('REDIS_PORT'),
				db: Environment.getInt('REDIS_DB'),
			});
			return new SharedCache({
				redis: redisClient,
			});
		},
		async isReady() {
			return true;
		},
	}),
	new Connector<PubSub>('pubsub', {
		async connect() {
			return new PubSub();
		},
		async isReady() {
			return true;
		},
	}),
]);
