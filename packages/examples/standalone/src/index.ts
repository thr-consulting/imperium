import debug from 'debug';
import {contextCreator} from './context';
import {connectors} from './connectors';

const d = debug('imperium.examples.standalone');

export async function main() {
	await connectors.connect();
	const context = contextCreator(connectors, 'abcd');

	const val = await context.domainAdvanced.context.SecureModel.getSecureData('mydata', context.domainAdvanced);
	d(val);

	// To have the process end, uncomment these two lines and uncomment the process.exit() in index.js.
	const noop = Function(); // eslint-disable-line no-new-func
	setInterval(noop, 10000);

	// await connectors.close();
}
