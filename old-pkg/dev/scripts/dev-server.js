/* eslint-disable no-console,@typescript-eslint/no-var-requires,global-require,import/no-dynamic-require */
// Common package imports
const cluster = require('cluster');
const d = require('debug')('imperium.dev.dev-server');
const getConfig = require('./getConfig');
require('dotenv').config();

// Read the configuration
const imperiumConfig = getConfig();

if (cluster.isMaster) {
	/* ****************************************************************************************
	 * SERVER MASTER ENTRY POINT
	 **************************************************************************************** */
	const chalk = require('chalk');
	const util = require('util');
	const chokidar = require('chokidar');
	const debounce = require('lodash/debounce');
	const {configureLogger} = require('@thx/log');
	const winston = require('winston');

	const log = configureLogger(winston.createLogger());

	log.info('Imperium Master startup (Workers: 1)', {environment: util.inspect(process.env, true, null, false)});

	const workerCrashDelay = parseInt(process.env.WORKER_CRASH_DELAY || '4000', 10); // Milliseconds to wait before restarting a worker process instead of counting towards crash max.
	const workerCrashMax = parseInt(process.env.WORKER_CRASH_MAX || '3', 10); // Number of times a worker is allowed to crash before killing the server.

	let workerCrashCounter = 0;
	let workerForkTime = process.hrtime.bigint(); // Record time worker is forked.

	// For dev, only fork a single worker
	let clusterWorker = cluster.fork(process.env);

	// Event: Fires when a worker exists
	cluster.on('exit', (deadWorker, code, signal) => {
		const workerForkTimeDifference = (process.hrtime.bigint() - workerForkTime) / 1000000n; // Calculate time since last worker fork and convert to milliseconds

		// If time between forks is less than the crash delay, increase the counter
		if (workerForkTimeDifference < workerCrashDelay) {
			workerCrashCounter++;
		} else {
			workerCrashCounter = 0;
		}

		// If the crash counter is less than the max, fork a new worker
		if (workerCrashCounter < workerCrashMax) {
			clusterWorker = cluster.fork();
			workerForkTime = process.hrtime.bigint(); // Record new worker time
			log.error(
				`Worker PID ${deadWorker.process.pid} died (code: ${code}) [${signal}] -> New PID: ${clusterWorker.process.pid} [Crash count: ${workerCrashCounter}]`,
				{
					workerForkTimeDifference: workerForkTimeDifference.toString(10),
					workerCrashCounter,
				},
			);
		} else {
			log.error('Worker thread keeps crashing, exiting main app...');
			setTimeout(() => {
				process.exit(1);
			}, 400);
		}
	});

	// Create a debounced function that will restart the worker thread
	const restartWorker = debounce(
		() => {
			clusterWorker.kill();
		},
		imperiumConfig.development.chokidarTimeout,
		{leading: true, trailing: false},
	);

	// Watch source folder for changes
	const watchFolders = [...imperiumConfig.source.watchPaths, imperiumConfig.source.path];
	chokidar.watch(watchFolders).on('change', filePath => {
		d(`  >> File ${filePath} was modified, restarting server thread...`);
		restartWorker();
	});

	// Display banner and info
	console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='));
	console.log(chalk.bold.white('  Imperium Framework - Development'));
	console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='));
	console.log(`Master process PID: ${process.pid}`);
	console.log('Number of workers:  1');
	console.log(`Watching folders: ${watchFolders.join(', ')}`);
	console.log('');
} else {
	/* ****************************************************************************************
	 * SERVER WORKER ENTRY POINT
	 **************************************************************************************** */
	const path = require('path');
	const isFunction = require('lodash/isFunction');
	const {log: webpackLog} = require('@thx/common-webpack');
	const log = require('winston');
	const {configureLogger} = require('@thx/log');

	configureLogger(log);

	require('@babel/register')({
		presets: [
			[
				'@imperium/babel-preset-imperium',
				{
					client: false,
					typescript: true,
					graphqls: true,
					alias: imperiumConfig.source.aliasPaths,
				},
			],
		],
		extensions: ['.js', '.ts'],
		ignore: [/node_modules/],
		only: [
			filepath => {
				webpackLog('BABEL/REG', filepath);
				return true;
			},
		],
		cache: false, // This is disabled because of: https://github.com/babel/babel/issues/8497
	});

	const worker = require(path.resolve(imperiumConfig.source.path, imperiumConfig.source.serverIndex)).default;
	if (!isFunction(worker)) {
		log.error('Server index must export a default function');
		process.exit(1);
	}
	worker().then(server => {
		if (!server && !isFunction(server.stop)) {
			log.error('Server default function must return an object with a stop() method that returns a Promise.');
			setTimeout(() => {
				process.exit(2);
			}, 400);
		}

		// Exit when SIGINT sent
		let catchOnce = false;
		process.on('SIGINT', () => {
			if (catchOnce === false) {
				catchOnce = true;
				log.info('Caught interrupt signal, shutting down');
				server.stop().finally(() => {
					setTimeout(() => {
						process.exit(0);
					}, 400);
				});
			}
		});

		// Catch uncaught exceptions
		process.on('uncaughtException', error => {
			log.log({
				level: 'error',
				message: `Fatal: Uncaught exception: ${error.message}`,
				error,
			});
			setTimeout(() => {
				process.exit(3);
			}, 400);
		});

		// Catch unhandled rejections
		process.on('unhandledRejection', error => {
			log.log({
				level: 'error',
				message: `Fatal: Unhandled promise rejection: ${error.message}`,
				error,
			});
			setTimeout(() => {
				process.exit(4);
			}, 400);
		});
	});
}
