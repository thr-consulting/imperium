import {env} from '@thx/env';
import {configureLogger} from '@thx/log';
import debug from 'debug';
import 'dotenv/config';
import {debounce, isFunction} from 'lodash-es';
import type {Worker} from 'node:cluster';
import cluster from 'node:cluster';
import os from 'node:os';
import process from 'node:process';
import util from 'node:util';
import winston from 'winston';
import {defaults} from './defaults';

const d = debug('imperium.cluster');

export type ClusterWorker = () => Promise<any>;

const log = configureLogger(winston.createLogger());

function exitAfter(ms: number, code = 0) {
	setTimeout(() => {
		process.exit(code);
	}, ms);
}

export function runCluster(clusterWorker: ClusterWorker) {
	if (cluster.isPrimary) {
		/* ****************************************************************************************
		 * CLUSTER MASTER ENTRY POINT
		 **************************************************************************************** */
		// Get number of processes to run
		const numProc = env.getInt('IMP_PROCESSES', defaults.IMP_PROCESSES);
		const numProcesses = numProc === 0 ? os.cpus().length : numProc;
		// When set true goes into full shutdown mode
		let shutdownMode = false;

		log.info(`Imperium cluster startup [Worker count: ${numProcesses}]`, {environment: util.inspect(process.env, true, null, false)});

		const workerCrashDelay = env.getInt('IMP_WORKER_CRASH_DELAY', defaults.IMP_WORKER_CRASH_DELAY); // Milliseconds to wait before restarting a worker process instead of counting towards crash max.
		const workerCrashMax = env.getInt('IMP_WORKER_CRASH_MAX', defaults.IMP_WORKER_CRASH_MAX); // Number of times a worker is allowed to crash before killing the server.

		let workerCrashCounter = 0;
		let workerForkTime = process.hrtime.bigint();

		// Keep track of spawned workers
		const workers: Worker[] = [];

		// Spawn initial processes
		for (let i = 0; i < numProcesses; i++) {
			const worker = cluster.fork();
			workers.push(worker);
		}

		cluster.on('exit', (deadWorker, code, signal) => {
			// Remove worker from our array
			const idx = workers.findIndex(v => v.process.pid === deadWorker.process.pid);
			workers.splice(idx, 1);

			// If we're shutting down, don't spawn new workers
			if (shutdownMode || code === 0) {
				log.info(`Worker PID: ${deadWorker.process.pid} exited [code: ${code}]`);
				if (workers.length === 0) {
					// No workers left in pool
					shutdownMode = true;
					log.info('No more workers left, exiting cluster master');
					exitAfter(400, 0);
				}
				return;
			}

			// Calculate difference (in ms) since the last time we forked a new worker
			const workerForkTimeDifference = (process.hrtime.bigint() - workerForkTime) / 1000000n;

			// If the difference is less than our crash delay, increment the crash counter
			if (workerForkTimeDifference < workerCrashDelay) {
				workerCrashCounter++;
			} else {
				workerCrashCounter = 0;
			}

			if (workerCrashCounter < workerCrashMax) {
				// We haven't reached our crash count max, so fork a new worker
				const newWorker = cluster.fork();
				workers.push(newWorker);
				workerForkTime = process.hrtime.bigint();
				log.error(
					`Worker PID: ${deadWorker.process.pid} died [code: ${code}, signal: ${signal}] -> New PID: ${newWorker.process.pid} [Crash count: ${workerCrashCounter}/${workerCrashMax}]`,
					{
						workerForkTimeDifference: workerForkTimeDifference.toString(10),
						workerCrashCounter,
					},
				);
			} else {
				log.error('Worker threads keeps crashing, exiting main app');
				if (env.isDevelopment() && env.getBool('ROLLUP_WATCH')) {
					log.info('Rollup watch still running, CTRL+C to exit');
				}
				shutdownMode = true;
			}
		});

		const catchSignal = debounce(
			(signal: string) => {
				log.info(`Caught signal: ${signal}`);
				shutdownMode = true;
				workers.forEach(worker => {
					worker.kill('SIGTERM');
				});
			},
			400,
			{leading: true},
		);

		// CTRL+C is SIGINT
		process.on('SIGINT', catchSignal);
		process.on('SIGTERM', catchSignal);
	} else {
		/* ****************************************************************************************
		 * CLUSTER WORKER ENTRY POINT
		 **************************************************************************************** */
		// Catch uncaught exceptions
		process.on('uncaughtException', error => {
			log.log({
				level: 'error',
				message: `Fatal: Uncaught exception: ${error.message}`,
				error,
			});
			exitAfter(400, 1);
		});

		// Catch unhandled rejections
		process.on('unhandledRejection', error => {
			log.log({
				level: 'error',
				// @ts-ignore
				message: `Fatal: Unhandled promise rejection: ${error.message}`,
				error,
			});
			exitAfter(400, 2);
		});

		clusterWorker()
			.then(server => {
				if (server && server.stop && isFunction(server.stop) && server.shutdown) {
					const ret = server.stop();
					if (ret && ret.then && isFunction(ret.then)) {
						ret.then(() => {
							exitAfter(400, 0);
						});
					}
				}
			})
			.catch(error => {
				log.log({
					level: 'error',
					message: `Fatal: Caught error: ${error.message}`,
					error,
				});
			});
	}
}
