import {ImperiumServer} from '@imperium/server';
import {Environment} from '@thx/env';
import debug from 'debug';
import {connectors} from '~core/connectors';
import {defaultEnvironment} from '~core/defaultEnvironment';
import {serverModules} from '~core/serverModules';
import {createDomain} from './createDomain';

const d = debug('template.server.core.server');

export default function core() {
	Environment.addDefaults(defaultEnvironment);
	Environment.addEnvironment(process.env);

	const server = new ImperiumServer({
		contextCreator: createDomain,
		connectors,
		serverModules,
		httpPort: Environment.getInt('SERVER_PORT'),
	});

	return server.start();
}
