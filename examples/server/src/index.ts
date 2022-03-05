import {defaults as authorizationDefaults} from '@imperium/authorization';
import {defaultEnvironment as domainDefaultEnvironment} from '@imperium/example-domain';
import {ImperiumServer} from '@imperium/server';
import {Environment} from '@thx/env';
import {connectors} from '~core/connectors';
import {contextCreator} from '~core/context';
import {defaultEnvironment} from '~core/defaultEnvironment';
import {serverModules} from '~core/serverModules';

export async function worker() {
	Environment.addDefaults(defaultEnvironment);
	Environment.addDefaults(domainDefaultEnvironment);
	Environment.addDefaults(authorizationDefaults);
	Environment.addEnvironment(process.env);

	Environment.addDefaults({
		SERVER_PORT: 4001,
	});

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
