import {ImperiumServer} from '@imperium/server';
import debug from 'debug';
import {connectors} from './connectors';
import {contextCreator} from './context';
import {serverModules} from './serverModules';

const d = debug('imperium.examples.server');

/*
  This default function export is required by the @imperium/dev scripts
  and is the entry point for the server application. The only requirement
  it has is that it returns an object/instance with a stop() method that returns
  a Promise.
*/
export default function core() {
	// Create the imperium server instance
	const server = new ImperiumServer({
		contextCreator,
		connectors,
		serverModules,
	});

	// setTimeout(() => {
	// 	throw new Error('timed error');
	// 	const y = Promise.reject('this is rejected');
	// }, 5000);

	// Start the imperium server
	// ImperiumServer's start() method returns the required stop() method.
	return server.start({
		port: parseInt(process.env.SERVER_PORT || '4001', 10),
	});
}
