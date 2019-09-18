/* eslint-disable no-console,@typescript-eslint/no-var-requires,global-require */
require('dotenv').config();
const cluster = require('cluster');

if (cluster.isMaster) {
	/* ****************************************************************************************
	 * SERVER MASTER ENTRY POINT
	 **************************************************************************************** */
	const os = require('os');

	// Get number of processes to run
	const numProcesses = process.env.PROCESSES || os.cpus().length;

	for (let i = 0; i < numProcesses; i++) {
		cluster.fork();
	}

	// TODO if worker is dying really fast, stop spawning new ones and kill main thread.
	cluster.on('exit', (deadWorker, code, signal) => {
		const newWorker = cluster.fork();
		console.log(`Worker ${deadWorker.process.pid} died (${code}) [${signal}] -> New PID: ${newWorker.process.pid}`);
	});

	console.log(`Master ${process.pid} is running [Processes: ${numProcesses}]`);
} else {
	/* ****************************************************************************************
	 * SERVER WORKER ENTRY POINT
	 **************************************************************************************** */

	const worker = require('./worker').default;
	worker().then(server => {
		// Exit when SIGINT sent
		process.on('SIGINT', () => {
			console.log('\n'); // eslint-disable-line no-console
			console.log('Caught interrupt signal, shutting down');
			server.stop().finally(() => {
				process.exit(0);
			});
		});

		// Catch uncaught exceptions
		process.on('uncaughtException', error => {
			console.error('Fatal: Uncaught exception', error);
			process.exit(3);
		});

		// Catch unhandled rejections
		process.on('unhandledRejection', error => {
			console.error('Fatal: Unhandled promise rejection', error);
			process.exit(4);
		});
	});
}
