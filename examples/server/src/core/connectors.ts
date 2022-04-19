import {Connectors, Connector} from '@imperium/connector';
import {MikroORM} from '@mikro-orm/core';
import {env} from '@thx/env';
import SharedCache from '@thx/sharedcache';
import debug from 'debug';
import {PubSub} from 'graphql-subscriptions';
import Redis from 'ioredis';
import {mikroOrmConfig} from '~core/mikro-orm.config';

const d = debug('imperium.server.core.connectors');

/*
	Connectors are a way to interface with databases and other persistence layers.
*/

export const connectors = new Connectors(async () => {
	const redis = new Redis(env.getString('REDIS_URL'));

	return [
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
				return new SharedCache({redis});
			},
			async isReady() {
				return true;
			},
			async close(sharedCache) {
				await sharedCache.quit();
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
	];
});
