import debug from 'debug';
import {contextCreator} from './context';
import {connectors} from './connectors';

const d = debug('imperium.examples.standalone');

// Being a standalone module, the authenticated user would never change.
const auth = {
	id: 'standalone-process-user',
};

export async function main() {
	await connectors.connect();
	const context = contextCreator(connectors, auth.id);

	d(context.domainAdvanced.auth?.id);

	await connectors.close();
}
