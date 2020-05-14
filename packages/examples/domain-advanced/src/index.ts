import debug from 'debug';
import {ContextManager, spreadEntities, Connector, ConnectorsConfig} from '@imperium/context-manager';
import type {Connection} from 'typeorm';
import {Score} from './Score';
import {SecureModel} from './SecureModel';

const d = debug('imperium.examples.domain-advanced');

type DomainAdvancedConnectors = Connector<{
	pg: ConnectorsConfig<Connection>;
}>;

export const typeormEntities = {Score};

export function createDomainAdvancedContext(connectors: DomainAdvancedConnectors, id?: string) {
	return new ContextManager(
		{
			...spreadEntities(typeormEntities),
			SecureModel: () => SecureModel,
		},
		connectors,
		id,
	);
}

export type Context = ReturnType<typeof createDomainAdvancedContext>;
