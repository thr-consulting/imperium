import {ImperiumServer} from '@imperium/server';
import {Environment} from '@thx/env';
import {defaultEnvironment as domainDefaultEnvironment} from '@imperium/example-domain';
import debug from 'debug';
import {defaultEnvironment} from './defaultEnvironment';
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
	Environment.addDefaults(defaultEnvironment);
	Environment.addDefaults(domainDefaultEnvironment);
	Environment.addEnvironment(process.env);

	// Create the imperium server instance
	const server = new ImperiumServer({
		contextCreator,
		connectors,
		serverModules,
		httpPort: Environment.getInt('SERVER_PORT'),
	});

	// Start the imperium server
	// ImperiumServer's start() method returns the required stop() method.
	return server.start();
}
