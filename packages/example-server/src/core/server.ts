import debug from 'debug';
import ImperiumServer from '@imperium/server';
import Connectors from './Connectors';
import serverModules from './serverModules';

const d = debug('imperium-proj.web');

export default function() {
	const server = new ImperiumServer({
		connectors: new Connectors(),
		serverModules,
		environment: {
			accessToken: 'blah',
		},
	});

	return server.start();
}
