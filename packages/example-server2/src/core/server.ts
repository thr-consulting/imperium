import {ImperiumServer} from '@imperium/server';
import debug from 'debug';
import {connectors} from './connectors';
import {serverModules} from './serverModules';
import {contextCreator} from './context';

const d = debug('imperium.example-server2.server');

export default function core() {
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
