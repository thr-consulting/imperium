import type {Connector, ConnectorsConfig} from '@imperium/connector';
import type {MikroORM} from 'mikro-orm';
import type SharedCache from '@thx/sharedcache';
import type {PubSub} from 'apollo-server-express';

// We export the required type of connectors this domain needs.
export type DomainConnectors = Connector<{
	orm: ConnectorsConfig<MikroORM>;
	sharedCache: ConnectorsConfig<SharedCache>;
	pubsub: ConnectorsConfig<PubSub>;
}>;
