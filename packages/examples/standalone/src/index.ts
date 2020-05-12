import {contextCreator} from './context';
import {connectors} from './connectors';

// Being a standalone module, the authenticated user would never change.
const auth = {
	id: 'standalone-process-user',
};

export async function main() {
	await connectors.connect();
	const context = contextCreator(connectors);

	// context.domain3.

	await connectors.close();
}
