import ImperiumServer, {ImperiumServerModule} from '@imperium/server';
import debug from 'debug';
import {connectors, createContext} from './domain';
import {serverModules} from './server';

const d = debug('imperium.main');

function contextCreator(conn: typeof connectors) {
	return {
		domain1: createContext(conn),
	};
}

export type ServerModule = ImperiumServerModule<typeof connectors, {}, ReturnType<typeof contextCreator>>;

export const server = new ImperiumServer({
	contextCreator,
	connectors,
	serverModules,
});

export async function main() {
	return server.start();
}
