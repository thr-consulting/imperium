const SCWorker = require('socketcluster/scworker');
const path = require('path');
const d = require('debug')('imperium.core.WorkerProd');
const worker = require('./worker').default;

// Catch unhandled rejections
process.on('unhandledRejection', (reason, p) => {
	d('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

class Worker extends SCWorker {
	run() {
		// const connPath = path.join('/home/darkadept/dev/imperium/proj', 'src', 'Connectors.js');
		import(
			/* webpackChunkName: "worker" */
			'../../Connectors.js'
		).then(Connectors => {
			// console.log(Connectors);
			worker(this, {
				Connectors: Connectors.default,
			});
		});
	}
}

new Worker(); // eslint-disable-line no-new
