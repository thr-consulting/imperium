import debug from 'debug';
import SocketCluster from 'socketcluster';
import os from 'os';
import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import chokidar from 'chokidar';
import debounce from 'lodash/debounce';
import config from '../../config';

const d = debug('imperium.core.server');

export default function server() {
	d('Starting Imperium server');

	// Import .env and expand variables:
	dotenvExpand(dotenv.config({silent: false}));

	const numCpus = os.cpus().length;
	const isProduction = process.env.NODE_ENV === 'production';
	const isDevelopment = process.env.NODE_ENV === 'development';

	// SocketCluster options
	const options = {
		workers: 1 || numCpus,
		brokers: 1,
		port: process.env.PORT || 4000,
		wsEngine: 'sc-uws',
		appName: process.env.APPNAME || 'Imperium',
		workerController: isProduction ? path.join(__dirname, '/WorkerProd.js') : path.join(__dirname, '/WorkerDev.js'),
		brokerController: path.join(__dirname, '/broker.js'),
		socketChannelLimit: 1000,
		authKey: process.env.JWT_SECRET,
		logLevel: 1,
		rebootWorkerOnCrash: !process.env.CI, // TODO check if this option still exists in socket cluster
	};

	// Create a new SocketCluster
	const sc = new SocketCluster(options); // eslint-disable-line no-new

	// Exit server on fail if testing with CI
	if (process.env.CI) {
		sc.on('fail', () => {
			process.exit(1);
		});
	}

	// Watch sources for changes and reloads workers (development only)
	if (isDevelopment) {
		// Create a debounced function that kills and restarts the workers (after 200ms)
		const restartWorkers = debounce(() => {
			console.log('  !! Restarting workers...'); // eslint-disable-line no-console
			sc.killWorkers({immediate: true});
		}, process.env.IMPERIUM_DEV_CHOKIDAR_TIMEOUT || 200, {leading: true, trailing: false});

		const chokidarWatchPaths = [
			path.join(process.cwd(), 'src'),
		];

		// This is only for Imperium development (although, it works ok in deployed projects)
		if (process.env.IMPERIUM_DEV) {
			chokidarWatchPaths.push(path.join(__dirname, '..', '..', '..'));
		}

		// Use chokidar to watch for file changes
		chokidar.watch(chokidarWatchPaths, {
			ignored: /node_modules/,
		}).on('change', filePath => {
			d(`Chokidar change detected: ${filePath}`);
			// Don't restart if we match imperium client settings/definitions
			if (
				filePath === path.join(process.cwd(), config.project.clientModules)
				|| filePath === path.join(process.cwd(), config.project.routeDefaults)
			) {
				return;
			}

			// Only restart when the path has a server/ or server.js in it.
			if (/server\//.test(filePath) || /server\.js$/.test(filePath)) {
				console.log(`  >> File ${filePath} was modified.`); // eslint-disable-line no-console
				restartWorkers();
			}
		});
	}
}
