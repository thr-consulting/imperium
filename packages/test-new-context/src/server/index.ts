import ImperiumServer, {ImperiumServerModule} from '@imperium/server';
import debug from 'debug';
import {connectors, createContext} from '../domain';
import {todoSeverModule} from './todo';

export const serverModules: ServerModule[] = [todoSeverModule];

const d = debug('imperium.main');

function contextCreator(conn: typeof connectors) {
	return {
		domain1: createContext(conn),
		someOtherDomain: {},
	};
}

export type ServerModule = ImperiumServerModule<ReturnType<typeof contextCreator>, typeof connectors>;

export const server = new ImperiumServer({
	contextCreator,
	connectors,
	serverModules,
});
