import type {Connector, ConnectorsConfig} from '@imperium/context-manager';
import {ContextManager, spreadEntities} from '@imperium/context-manager';
import debug from 'debug';
import type {Connection} from 'typeorm';
import {Score} from './Score';
import {SecureModel} from './SecureModel';
// import {authDomainBridge} from './authDomainBridge';

const d = debug('imperium.example.server.domain3');

type Domain3Connectors = Connector<{
	pg: ConnectorsConfig<Connection>;
}>;

export const typeormEntities = {Score};

export function createDomain3Context(connectors: Domain3Connectors, auth) {
	return new ContextManager(
		{
			...spreadEntities(typeormEntities),
			SecureModel: () => SecureModel,
		},
		connectors,
		auth,
	);
}

export type Context = ReturnType<typeof createDomain3Context>;

// export {authDomainBridge};
