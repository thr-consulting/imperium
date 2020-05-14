import debug from 'debug';
import {Auth, ContextManager, spreadEntities, Connector, ConnectorsConfig} from '@imperium/context-manager';
import type {Connection} from 'typeorm';
import {Score} from './Score';
import {SecureModel} from './SecureModel';
import {authDomainBridge} from './authDomainBridge';

const d = debug('imperium.example.domain-advanced');

type DomainAdvancedConnectors = Connector<{
	pg: ConnectorsConfig<Connection>;
}>;

export const typeormEntities = {Score};

export function createDomainAdvancedContext(connectors: DomainAdvancedConnectors, id: string) {
	return new ContextManager(
		{
			...spreadEntities(typeormEntities),
			SecureModel: () => SecureModel,
		},
		connectors,
		new Auth(authDomainBridge(), id),
	);
}

export type Context = ReturnType<typeof createDomainAdvancedContext>;
