import {configureLogger} from '@thx/log';
import debug from 'debug';
import 'dotenv/config';
import {debounce} from 'lodash-es';
import cluster from 'node:cluster';
import os from 'node:os';
import util from 'node:util';
import winston from 'winston';

const d = debug('imperium.cluster');

export type ClusterWorker = () => Promise<void>;

const log = configureLogger(winston.createLogger());

function exitAfter(ms: number, code = 0) {
	setTimeout(() => {
		process.exit(code);
	}, ms);
}

export function runCluster(clusterWorker: ClusterWorker) {
	if (cluster.isPrimary) {
		/* ****************************************************************************************
		 * SERVER MASTER ENTRY POINT
		 **************************************************************************************** */
		// Get number of processes to run
		const numProcesses = process.env.IMPERIUM_PROCESSES === '0' ? os.cpus().length : process.env.IMPERIUM_PROCESSES || 1;

		log.info(`Imperium Master startup (Workers: ${numProcesses})`, {environment: util.inspect(process.env, true, null, false)});

		const workerCrashDelay = parseInt(process.env.IMPERIUM_WORKER_CRASH_DELAY || '4000', 10); // Milliseconds to wait before restarting a worker process instead of counting towards crash max.
		const workerCrashMax = parseInt(process.env.IMPERIUM_WORKER_CRASH_MAX || '5', 10); // Number of times a worker is allowed to crash before killing the server.

		let workerCrashCounter = 0;
		let workerForkTime = process.hrtime.bigint();

		// Spawn initial processes
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
				exitAfter(400, 1);
			}
		});
	} else {
		/* ****************************************************************************************
		 * SERVER WORKER ENTRY POINT
		 **************************************************************************************** */
		clusterWorker().then(server => {
			// Exit when SIGINT sent
			process.on(
				'SIGINT',
				debounce(
					() => {
						log.info('Caught interrupt signal, shutting down');
						// @ts-ignore todo remove this
						if (server) {
							// @ts-ignore todo remove this
							server.stop().finally(() => {
								exitAfter(400, 0);
							});
						} else {
							exitAfter(400, 0);
						}
					},
					400,
					{leading: true},
				),
			);

			// Catch uncaught exceptions
			process.on('uncaughtException', error => {
				log.log({
					level: 'error',
					message: `Fatal: Uncaught exception: ${error.message}`,
					error,
				});
				exitAfter(400, 3);
			});

			// Catch unhandled rejections
			process.on('unhandledRejection', error => {
				log.log({
					level: 'error',
					// @ts-ignore
					message: `Fatal: Unhandled promise rejection: ${error.message}`,
					error,
				});
				exitAfter(400, 4);
			});
		});
	}
}
