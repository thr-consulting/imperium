import {Connector, ContextManager} from '@imperium/server';
import {Todo} from './todo';

export const connectors = new Connector({
	mongo: {
		connect() {
			return 'some shit here idk';
		},
		close() {},
	},
});

export function createContext(connector: typeof connectors) {
	return new ContextManager(
		{
			Todo: (conn) => ({...Todo, TodoLoader: Todo.createDataLoader(conn)}),
		},
		connector,
	);
}
