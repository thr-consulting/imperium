import debug from 'debug';
import {contextCreator} from './context';
import {connectors} from './connectors';

const d = debug('imperium.example.standalone');

// Being a standalone module, the authenticated user would never change.
const auth = {
	id: 'standalone-process-user',
};

export async function main() {
	await connectors.connect();
	const context = contextCreator(connectors, auth);

	d(context.domain3.auth?.id);

	await connectors.close();
}
