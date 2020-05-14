import debug from 'debug';
import {contextCreator} from './context';
import {connectors} from './connectors';

const d = debug('imperium.examples.standalone');

export async function main() {
	await connectors.connect();
	const context = contextCreator(connectors, 'abcd');

	const val = await context.domainAdvanced.context.SecureModel.getSecureData('mydata', context.domainAdvanced);
	d(val);

	await connectors.close();
}
