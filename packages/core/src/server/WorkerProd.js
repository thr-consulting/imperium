/* eslint-disable @typescript-eslint/no-var-requires */
const SCWorker = require('socketcluster/scworker');
const d = require('debug')('imperium.core.WorkerProd');
const Connectors = require('Connectors').default;
const serverModules = require('serverModules').default;
const worker = require('./worker').default;

// Catch unhandled rejections
process.on('unhandledRejection', (reason, p) => {
	d('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

class Worker extends SCWorker {
	run() {
		worker(this, {
			Connectors,
			serverModules,
		});
	}
}

new Worker(); // eslint-disable-line no-new
