import debug from 'debug';
import {SocketCluster} from 'socketcluster';
import os from 'os';
import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import chokidar from 'chokidar';
import debounce from 'lodash/debounce';

// Import .env and expand variables:
dotenvExpand(dotenv.config({silent: false}));

const d = debug('app:core:server');
const numCpus = os.cpus().length;
const PROD = process.env.NODE_ENV === 'production';

// TODO check additional env variables here and throw errors if they are wrong
// Asset paths
if (!process.env.ASSET_PATH) throw new Error('ASSET_PATH environment variable missing');

// SocketCluster options
export const options = {
	authKey: process.env.JWT_SECRET,
	logLevel: 1,
	// change this to scale vertically
	workers: 1 || numCpus,
	brokers: 1,
	port: process.env.PORT || 4000,
	appName: process.env.APPNAME || 'NRB',
	allowClientPublish: false,
	workerController: path.join(__dirname, PROD ? '/worker-prod.js' : '/worker-dev.js'),
	brokerController: path.join(__dirname, '/broker.js'),
	socketChannelLimit: 1000,
	rebootWorkerOnCrash: !process.env.CI,
};

d('Starting socket cluster...');
const sc = new SocketCluster(options); // eslint-disable-line no-new

// Exit server on fail if testing with CI
if (process.env.CI) {
	sc.on('fail', () => {
		process.exit(1);
	});
}

// Watch "src" for changes and reloads workers
//   Only restarts if "server" or "data" is somewhere in the path
if (process.env.NODE_ENV !== 'production') {
	// Create a debounced function that kills and restarts the workers
	const restartWorkers = debounce(() => {
		console.log('  !! Restarting workers...'); // eslint-disable-line no-console
		sc.killWorkers({immediate: true});
	}, 200, {leading: true, trailing: false});

	// Use chokidar to watch for file changes
	chokidar.watch([
		'src/',
	], {
		ignored: /node_modules/,
	}).on('change', filePath => {
		if (/(server|data)\//.test(filePath) || /server\.js$/.test(filePath)) {
			console.log(`  >> File ${filePath} was modified.`); // eslint-disable-line no-console
			restartWorkers();
		}
	});
}
