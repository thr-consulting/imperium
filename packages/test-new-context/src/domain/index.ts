import {Connector, ConnectorsConfig, ContextManager} from '@imperium/context-manager';
import debug from 'debug';
import {Todo} from './todo';

const d = debug('imperium.test-new-context.domain');

type RequiredConnectors = Connector<{
	mongo: ConnectorsConfig<number>;
}>;

export function createContext(connector: RequiredConnectors) {
	return new ContextManager(
		{
			Todo: conn => {
				return Todo;
			},
		},
		connector,
	);
}

export type Context = ReturnType<typeof createContext>;
