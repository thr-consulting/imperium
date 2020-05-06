import {ImperiumServer} from '@imperium/server';
import debug from 'debug';
import {connectors} from './connectors';
import {createDomain1Context} from '../domain1/domain1';
import {serverModules} from './serverModules';

const d = debug('imperium.example-server2.server');

// Define a context creator function for your domains.
//  You can specify multiple domains but they are isolated from each other.
//  Domains can be ANYTHING but are usually an instance of ContextManager.
//  that are created in the domain library.
function contextCreator(conn: typeof connectors) {
	return {
		domain1: createDomain1Context(conn),
		domain2: {anything: 5},
	};
}

// We also need to export the return type of the context creator function.
// This will be imported by server modules.
export type Context = ReturnType<typeof contextCreator>;

export default function core() {
	d('hello');

	// Create the imperium server instance
	const server = new ImperiumServer({
		contextCreator,
		connectors,
		serverModules,
	});

	// Start the imperium server
	return server.start({
		port: parseInt(process.env.SERVER_PORT || '4001', 10),
	});
}
