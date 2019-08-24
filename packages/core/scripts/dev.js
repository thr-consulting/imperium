const cluster = require('cluster');
const getConfig = require('./getConfig');
require('dotenv').config();
const d = require('debug')('imperium.core');

// Read the configuration
const imperiumConfig = getConfig();

if (cluster.isMaster) {
	/*
	 * SERVER MASTER ENTRY POINT
	 */
	const chalk = require('chalk');
	const chokidar = require('chokidar');
	const debounce = require('lodash/debounce');
	const webpack = require('webpack');
	const WebpackDevServer = require('webpack-dev-server');

	console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='));
	console.log(chalk.bold.white('  Imperium Framework - Development'));
	console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='));

	console.log(`Master process PID: ${process.pid}`);
	console.log(`Number of workers:  1`);
	console.log(`Server port:        ${process.env.PORT || 4000}`);
	console.log(`Client port:        ${imperiumConfig.development.clientPort}`);
	console.log('');

	const restartWorker = debounce(() => {
		clusterWorker.kill();
	}, process.env.IMPERIUM_DEV_CHOKIDAR_TIMEOUT || 200, {leading: true, trailing: false});

	// Watch source folder for changes
	chokidar.watch([
		imperiumConfig.source.path,
	]).on('change', filePath => {
		// console.log(`Chokidar change detected: ${filePath}`);
		// Only restart when the path has a server/ or server.js in it.
		// TODO add graphqls files
		if (/server\//.test(filePath) || /server\.[tj]sx?$/.test(filePath)) {
			console.log(`  >> File ${filePath} was modified, restarting server thread...`); // eslint-disable-line no-console
			restartWorker();
		}
	});

	// Webpack Dev Server (for Client code)
	const webpackConfig = require('../webpack/client.dev')(imperiumConfig);
	const compiler = webpack(webpackConfig);
	const server = new WebpackDevServer(compiler, webpackConfig.devServer);

	server.listen(parseInt(imperiumConfig.development.clientPort, 10), '127.0.0.1', () => {
		d(`Client webpack-dev-server started on port ${imperiumConfig.development.clientPort}`);
	});

	// For dev, only fork a single worker
	let clusterWorker = cluster.fork();

	// TODO if worker is dying really fast, stop spawning new ones and kill main thread.
	cluster.on('exit', (deadWorker, code, signal) => {
		clusterWorker = cluster.fork();
		d(`Worker PID ${deadWorker.process.pid} died (${code}) [${signal}] -> New PID: ${clusterWorker.process.pid}`)
	});
} else {
	/*
	 * SERVER WORKER ENTRY POINT
	 */
	const path = require('path');

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

	require('@babel/register')({
		presets: [['@imperium/babel-preset-imperium',	{client: false, typescript: true}]],
		extensions: ['.js', '.ts'],
	});

	const worker = require(path.resolve(imperiumConfig.source.path, imperiumConfig.source.serverIndex)).default;
	worker();
}
