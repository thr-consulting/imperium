import type {Connector, ConnectorsConfig} from '@imperium/context-manager';
import {ContextManager, spreadEntities} from '@imperium/context-manager';
import debug from 'debug';
import type {Connection} from 'typeorm';
import {Score} from './Score';

const d = debug('imperium.example-server2.domain3');

type Domain3Connectors = Connector<{
	pg: ConnectorsConfig<Connection>;
}>;

export const typeormEntities = {Score};

export function createDomain3Context(connectors: Domain3Connectors) {
	return new ContextManager(
		{
			...spreadEntities(typeormEntities),
		},
		connectors,
	);
}

export type Context = ReturnType<typeof createDomain3Context>;
