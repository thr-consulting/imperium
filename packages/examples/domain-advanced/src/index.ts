import debug from 'debug';
import {ContextManager, spreadEntities, Connector, ConnectorsConfig, Auth} from '@imperium/context-manager';
import type SharedCache from '@thx/sharedcache';
import type {Connection} from 'typeorm';
import {Score} from './Score';
import {SecureModel} from './SecureModel';
import {AuthModel} from './AuthModel';

const d = debug('imperium.examples.domain-advanced');

export type DomainAdvancedConnectors = Connector<{
	pg: ConnectorsConfig<Connection>;
	sharedCache: ConnectorsConfig<SharedCache>;
}>;

export const typeormEntities = {Score};

export function createDomainAdvancedContext(connectors: DomainAdvancedConnectors, auth: Auth) {
	return new ContextManager(
		{
			...spreadEntities(typeormEntities),
			AuthModel: () => new AuthModel(connectors),
			SecureModel: () => SecureModel,
		},
		connectors,
		auth,
	);
}

export type Context = ReturnType<typeof createDomainAdvancedContext>;
