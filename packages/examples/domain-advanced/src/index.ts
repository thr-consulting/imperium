import debug from 'debug';
import {ContextManager, spreadEntities, Connector, ConnectorsConfig, Auth} from '@imperium/context-manager';
import type {Connection} from 'typeorm';
import {Score} from './Score';
import {SecureModel} from './SecureModel';

const d = debug('imperium.examples.domain-advanced');

type DomainAdvancedConnectors = Connector<{
	pg: ConnectorsConfig<Connection>;
}>;

export const typeormEntities = {Score};

export function createDomainAdvancedContext(connectors: DomainAdvancedConnectors, auth: Auth) {
	return new ContextManager(
		{
			...spreadEntities(typeormEntities),
			SecureModel: () => SecureModel,
		},
		connectors,
		auth,
	);
}

export type Context = ReturnType<typeof createDomainAdvancedContext>;
