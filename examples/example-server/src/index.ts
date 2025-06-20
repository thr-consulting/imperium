import {ImperiumServer} from '@imperium/server';
import {env} from '@thx/env';
import {connectors} from '~core/connectors';
import {contextCreator} from '~core/context';
import {serverModules} from '~core/serverModules';

export async function worker() {
	// Create the imperium server instance
	const server = new ImperiumServer({
		contextCreator,
		connectors,
		serverModules,
		httpPort: env.getInt('SERVER_PORT', 4001),
	});

	// Start the imperium server
	// ImperiumServer's start() method returns the required stop() method.
	return server.start();
}
