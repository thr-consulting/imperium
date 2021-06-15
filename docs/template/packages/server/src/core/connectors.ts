import {Connector, Connectors} from '@imperium/connector';
import {MikroORM} from '@mikro-orm/core';
import {Environment} from '@thx/env';
import SharedCache from '@thx/sharedcache';
import {createClient} from 'redis';
import {mikroOrmConfig} from '~core/mikro-orm.config';

export const connectors = new Connectors([
	new Connector<MikroORM>('orm', {
		async connect() {
			return MikroORM.init(mikroOrmConfig);
		},
		async close(orm) {
			return orm.close(true);
		},
		async isReady(orm) {
			return orm.isConnected();
		},
	}),
	new Connector<SharedCache>('cache', {
		async connect() {
			return new SharedCache({
				redis: createClient(Environment.getString('REDIS_URL')),
				prefix: 'template',
			});
		},
	}),
]);

export function getConnector(type: 'orm', cnnectors: Connectors): MikroORM;
export function getConnector(type: 'cache', cnnectors: Connectors): SharedCache;
export function getConnector(type: string, cnnectors: Connectors) {
	return cnnectors.get(type);
}
