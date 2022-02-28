import {defaultEnvironment as domainDefaultEnvironment} from '@imperium/example-domain';
import {ImperiumServer} from '@imperium/server';
import {Environment} from '@thx/env';
import debug from 'debug';
import {connectors} from '~core/connectors';
import {contextCreator} from '~core/context';
import {defaultEnvironment} from '~core/defaultEnvironment';
import {serverModules} from '~core/serverModules';

const d = debug('imperium.examples.server.core.server');

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
