import {contextCreator} from './context';
import {connectors} from './connectors';

export async function main() {
	await connectors.connect();
	const context = contextCreator(connectors);

	// context.domain3.

	await connectors.close();
}
