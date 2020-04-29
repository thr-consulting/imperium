import {Connector, ContextManager, ConnectorsConfig} from '@imperium/context-manager';
import {Todo} from './todo';

type RequiredConnectors = Connector<{
	mongo: ConnectorsConfig<number>;
}>;

export function createContext(connector: RequiredConnectors) {
	// eslint-disable-next-line no-console
	console.log("creating todo's domain context");
	return new ContextManager(
		{
			Todo: conn => {
				// eslint-disable-next-line no-console
				console.log(conn.connections.mongo);
				return Todo;
			},
		},
		connector,
	);
}

export type Context = ReturnType<typeof createContext>;
