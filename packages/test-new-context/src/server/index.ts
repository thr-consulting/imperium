import {Connector} from '@imperium/context-manager';
import {graphqlServerModule, ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import ImperiumServer, {ImperiumServerModule} from '@imperium/server';
import debug from 'debug';
import {createContext} from '../domain';
import {todoSeverModule} from './todo';

export const serverModules: ImperiumServerModule<any, any>[] = [graphqlServerModule, todoSeverModule];

const d = debug('imperium.test-new-context.server');

// todo connectors should be the responsibility of the instantiating server. (in this case, the test server)
const testServerConnectors = new Connector({
	mongo: {
		async connect() {
			return 5;
		},
		async close() {
			d('closing test server connectors');
		},
	},
});

function contextCreator(conn: typeof testServerConnectors) {
	return {
		todoDomain: createContext(conn),
		someOtherDomain: {},
	};
}

export type ServerModule = ImperiumGraphqlServerModule<ReturnType<typeof contextCreator>, typeof testServerConnectors>;

export const server = new ImperiumServer({
	contextCreator,
	connectors: testServerConnectors,
	serverModules,
});
