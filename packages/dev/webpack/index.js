require('dotenv').config();
const cluster = require('cluster');

if (cluster.isMaster) {
	/*
	 * MASTER ENTRY POINT
	 */
	const os = require('os');

	// Get number of processes to run
	console.log(process.env.PROCESSES);
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
	/*
	 * WORKER ENTRY POINT
	 */
	// Exit when SIGINT sent
	process.on('SIGINT', () => {
		console.log('\n'); // eslint-disable-line no-console
		console.log('Caught interrupt signal, shutting down');
		process.exit(1);
	});

	// Catch uncaught exceptions
	process.on('uncaughtException', error => {
		console.error('Fatal: Uncaught exception', error);
		process.exit(1);
	});

	// Catch unhandled rejections
	process.on('unhandledRejection', error => {
		console.error('Fatal: Unhandled promise rejection', error);
		process.exit(1);
	});

	const worker = require('./worker').default;
	worker();
}
