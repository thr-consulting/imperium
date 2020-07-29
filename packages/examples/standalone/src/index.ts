import debug from 'debug';
import {contextCreator} from './context';
import {connectors} from './connectors';
import {environment} from './environment';

const d = debug('imperium.examples.standalone');
const env = environment();

export async function main() {
	await connectors.connect();
	const ctx = await contextCreator(connectors);

	const val = await ctx.SecureModel.getSecureData('mydata', ctx);
	d(val);

	if (env.runAsService) {
		const noop = Function(); // eslint-disable-line no-new-func, @typescript-eslint/no-implied-eval
		setInterval(noop, 10000); // eslint-disable-line @typescript-eslint/no-implied-eval
	} else {
		await connectors.close();
	}
}
