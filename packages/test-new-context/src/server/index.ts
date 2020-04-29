import {Connector} from '@imperium/context-manager';
import ImperiumServer, {ImperiumServerModule} from '@imperium/server';
import debug from 'debug';
import {createContext} from '../domain';
import {todoSeverModule} from './todo';

export const serverModules: ServerModule[] = [todoSeverModule];

const d = debug('imperium.main');

// todo connectors should be the responsibility of the instantiating server. (in this case, the test server)
const testServerConnectors = new Connector({
	mongo: {
		async connect() {
			return 5;
		},
		async close() {
			// eslint-disable-next-line no-console
			console.log();
		},
	},
});

function contextCreator(conn: typeof testServerConnectors) {
	return {
		domain1: createContext(conn),
		someOtherDomain: {},
	};
}

export type ServerModule = ImperiumServerModule<ReturnType<typeof contextCreator>, typeof testServerConnectors>;

export const server = new ImperiumServer({
	contextCreator,
	connectors: testServerConnectors,
	serverModules,
});
