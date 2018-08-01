const SCWorker = require('socketcluster/scworker');
const worker = require('./worker').default;
const path = require('path');
const Connectors = require(path.join(process.cwd(), 'src', 'Connectors.js')).default;

class Worker extends SCWorker {
	run() {
		worker(this);
	}
}

new Worker(); // eslint-disable-line no-new
