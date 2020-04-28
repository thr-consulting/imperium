import {Connector, ContextManager} from '@imperium/context-manager';
import {Todo} from './todo';

export const connectors = new Connector({
	mongo: {
		async connect() {
			// Return your mongo connection here
			return new Promise<number>(resolve => {
				setTimeout(() => {
					// eslint-disable-next-line no-console
					console.log('creating mongo connector for todo domain.');
					resolve(5);
				}, 2000);
			});
		},
		async close(conn) {
			// close your mongo connection here.
			// eslint-disable-next-line no-console
			console.log('Closing mongo connector for todo domain', conn);
		},
	},
});

export function createContext(connector: typeof connectors) {
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
