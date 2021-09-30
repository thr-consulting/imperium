import {defaultEnvironment as domainDefaultEnvironment} from '@imperium/example-domain';
import {Environment} from '@thx/env';
import debug from 'debug';
import {connectors} from './connectors';
// import {configureLogger} from '@thx/log';
// import {log} from 'winston';
// import {contextCreator} from './context';
import {defaultEnvironment} from './defaultEnvironment';

const d = debug('imperium.examples.examples/standalone');

export async function main() {
	Environment.addDefaults(defaultEnvironment);
	Environment.addDefaults(domainDefaultEnvironment);
	Environment.addEnvironment(process.env);

	// @ts-ignore
	// configureLogger(log);

	await connectors.connect();
	// const ctx = await contextCreator(connectors);

	if (Environment.getBool('RUN_AS_SERVICE')) {
		// eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
		const noop = Function();
		// eslint-disable-next-line @typescript-eslint/no-implied-eval
		setInterval(noop, 10000);
	} else {
		await connectors.close();
	}
}
