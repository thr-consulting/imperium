import debug from 'debug';
import ImperiumServer from '@imperium/server';
import Connectors from './Connectors';
import serverModules from './serverModules';

const d = debug('imperium.example-server');

export default function() {
	const server = new ImperiumServer({
		connectors: new Connectors(),
		serverModules,
		environment: {
			fdsa: 'fda',
		},
	});

	return server.start();
}
