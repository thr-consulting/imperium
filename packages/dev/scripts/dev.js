/* eslint-disable no-console,@typescript-eslint/no-var-requires,global-require,import/no-dynamic-require */
// Common package imports
const cluster = require('cluster');
const d = require('debug')('imperium.dev.dev');
const getConfig = require('./getConfig');
require('dotenv').config();

// Read the configuration
const imperiumConfig = getConfig();

if (cluster.isMaster) {
	/* ****************************************************************************************
	 * SERVER MASTER ENTRY POINT
	 **************************************************************************************** */
	const chalk = require('chalk');
	const chokidar = require('chokidar');
	const debounce = require('lodash/debounce');
	const webpack = require('webpack');
	const WebpackDevServer = require('webpack-dev-server');

	// Display banner and info
	console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='));
	console.log(chalk.bold.white('  Imperium Framework - Development'));
	console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='));
	console.log(`Master process PID: ${process.pid}`);
	console.log(`Number of workers:  1`);
	console.log(`Server port:        ${process.env.PORT || 4001}`);
	console.log(`Client port:        ${imperiumConfig.development.clientPort}`);
	console.log('');

	// Webpack Dev Server (for Client code)
	const webpackConfig = require('../webpack/client.dev')(imperiumConfig);
	const compiler = webpack(webpackConfig);
	const server = new WebpackDevServer(compiler, webpackConfig.devServer);
	server.listen(
		parseInt(imperiumConfig.development.clientPort, 10),
		'127.0.0.1',
		() => {
			d(
				`Client webpack-dev-server started on port ${imperiumConfig.development.clientPort}`,
			);
		},
	);

	// For dev, only fork a single worker
	let clusterWorker = cluster.fork();

	let workerCrashCounter = 0;
	let workerForkTime = process.hrtime(); // Record time worker is forked.

	// Event: Fires when a worker exists
	cluster.on('exit', (deadWorker, code, signal) => {
		const workerForkTimeDifference = process.hrtime(workerForkTime); // Calculate time since last worker fork

		// If time between forks is less than the crash delay, increase the counter
		if (
			workerForkTimeDifference[0] < imperiumConfig.development.workerCrashDelay
		) {
			workerCrashCounter++;
		}

		// If the crash counter is less than the max, fork a new worker
		if (workerCrashCounter < imperiumConfig.development.workerCrashMax) {
			clusterWorker = cluster.fork();
			workerForkTime = process.hrtime(); // Record new worker time
			d(
				`${workerCrashCounter} Worker PID ${deadWorker.process.pid} died (${code}) [${signal}] -> New PID: ${clusterWorker.process.pid}`,
			);
		} else {
			console.error('Worker thread keeps crashing, exiting main app.');
			process.exit(1);
		}
	});

	// Create a debounced function that will restart the worker thread
	const restartWorker = debounce(
		() => {
			clusterWorker.kill();
		},
		process.env.IMPERIUM_DEV_CHOKIDAR_TIMEOUT || 200,
		{leading: true, trailing: false},
	);

	// Watch source folder for changes
	chokidar.watch([imperiumConfig.source.path]).on('change', filePath => {
		// console.log(`Chokidar change detected: ${filePath}`);
		// Only restart when the path has a server/ or server.js in it.
		// TODO add graphqls files
		if (/server\//.test(filePath) || /server\.[tj]sx?$/.test(filePath)) {
			console.log(
				`  >> File ${filePath} was modified, restarting server thread...`,
			); // eslint-disable-line no-console
			restartWorker();
		}
	});
} else {
	/* ****************************************************************************************
	 * SERVER WORKER ENTRY POINT
	 **************************************************************************************** */
	const path = require('path');
	const isFunction = require('lodash/isFunction');
	const {log} = require('../webpack/inspectLoader');

	require('@babel/register')({
		presets: [
			['@imperium/babel-preset-imperium', {client: false, typescript: true}],
		],
		extensions: ['.js', '.ts'],
		ignore: [/node_modules/],
		only: [
			filepath => {
				log('BABEL/REG', filepath);
				return true;
			},
		],
	});

	const worker = require(path.resolve(
		imperiumConfig.source.path,
		imperiumConfig.source.serverIndex,
	)).default;
	if (!isFunction(worker)) {
		console.error('Server index must export a default function');
		process.exit(1);
	}
	worker().then(server => {
		if (!server) {
			console.error('Server index function must return server.start()');
			process.exit(2);
		}

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
