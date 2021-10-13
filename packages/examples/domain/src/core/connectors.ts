import type {Connectors} from '@imperium/connector';
import type {MikroORM} from '@mikro-orm/core';
import type SharedCache from '@thx/sharedcache';
import type {PubSub} from 'graphql-subscriptions';

export function getConnector(type: 'orm', connectors: Connectors): MikroORM;
export function getConnector(type: 'sharedCache', connectors: Connectors): SharedCache;
export function getConnector(type: 'pubsub', connectors: Connectors): PubSub;
export function getConnector(type: string, connectors: Connectors) {
	return connectors.get(type);
}
