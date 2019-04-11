/* eslint-disable @typescript-eslint/no-var-requires */
const SCBroker = require('socketcluster/scbroker');
const debug = require('debug');

const d = debug('imperium.core.server.broker');

class Broker extends SCBroker {
	run() {
		d(`  >> Broker PID: ${process.pid}`);
	}
}

new Broker(); // eslint-disable-line no-new
