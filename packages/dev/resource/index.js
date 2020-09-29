/* eslint-disable no-console,@typescript-eslint/no-var-requires,global-require */
require('dotenv').config();
const cluster = require('cluster');

if (cluster.isMaster) {
	/* ****************************************************************************************
	 * SERVER MASTER ENTRY POINT
	 **************************************************************************************** */
	const os = require('os');
	const util = require('util');
	const {configureLogger} = require('@thx/log');
	const winston = require('winston');

	// Get number of processes to run
	const numProcesses = process.env.PROCESSES || os.cpus().length;
	console.log(process.env.PROCESSES);

	const log = configureLogger(winston.createLogger());

	log.info(`Imperium Master startup (Workers: ${numProcesses})`, {environment: util.inspect(process.env, true, null, false)});

	const workerCrashDelay = parseInt(process.env.WORKER_CRASH_DELAY || '4000', 10); // Milliseconds to wait before restarting a worker process instead of counting towards crash max.
	const workerCrashMax = parseInt(process.env.WORKER_CRASH_MAX || '16', 10); // Number of times a worker is allowed to crash before killing the server.

	let workerCrashCounter = 0;
	let workerForkTime = process.hrtime.bigint();

	for (let i = 0; i < numProcesses; i++) {
		cluster.fork();
	}

	cluster.on('exit', (deadWorker, code, signal) => {
		const workerForkTimeDifference = (process.hrtime.bigint() - workerForkTime) / 1000000n;

		if (workerForkTimeDifference < workerCrashDelay) {
			workerCrashCounter++;
		} else {
			workerCrashCounter = 0;
		}

		if (workerCrashCounter < workerCrashMax) {
			const newWorker = cluster.fork();
			workerForkTime = process.hrtime.bigint();
			log.error(
				`Worker PID ${deadWorker.process.pid} died (code: ${code}) [${signal}] -> New PID: ${newWorker.process.pid} [Crash count: ${workerCrashCounter}]`,
				{
					workerForkTimeDifference: workerForkTimeDifference.toString(10),
					workerCrashCounter,
				},
			);
		} else {
			log.error('Worker threads keeps crashing, exiting main app...');
			log.end(() => {
				process.exit(1);
			});
		}
	});
} else {
	/* ****************************************************************************************
	 * SERVER WORKER ENTRY POINT
	 **************************************************************************************** */
	const {configureLogger} = require('@thx/log');
	const log = require('winston');

	configureLogger(log);

	const worker = require('./worker').default;
	worker().then(server => {
		// Exit when SIGINT sent
		process.on('SIGINT', () => {
			log.info('Caught interrupt signal, shutting down');
			server.stop().finally(() => {
				log.end(() => {
					process.exit(0);
				});
			});
		});

		// Catch uncaught exceptions
		process.on('uncaughtException', error => {
			log.log({
				level: 'error',
				message: `Fatal: Uncaught exception: ${error.message}`,
				error,
			});
			log.end(() => {
				process.exit(3);
			});
		});

		// Catch unhandled rejections
		process.on('unhandledRejection', error => {
			log.log({
				level: 'error',
				message: `Fatal: Unhandled promise rejection: ${error.message}`,
				error,
			});
			log.end(() => {
				process.exit(4);
			});
		});
	});
}
