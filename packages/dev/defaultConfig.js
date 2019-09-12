/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const iRoot = path.resolve(__dirname);
const pRoot = path.resolve(process.cwd());

module.exports = {
	development: {
		clientPort: 4000,
		workerCrashDelay: 2, // Seconds
		workerCrashMax: 5,
	},
	build: {
		path: path.join(pRoot, 'build'),
		client: {
			minimize: true,
			devtool: false,
			vendorChunk: [
				'react',
				'react-dom',
				// 'react-router-dom',
				'lodash',
				'debug',
				// 'jsonwebtoken',
				// 'whatwg-fetch',
			],
			rules: [],
		},
		server: {
			minimize: true,
			devtool: false,
			externals: [
				path.join(pRoot, 'node_modules'),
				path.join(pRoot, '..', '..', 'node_modules'), // Needed if the project is a lerna project
			],
			rules: [],
		},
	},
	source: {
		projectRoot: pRoot,
		imperiumRoot: iRoot,
		path: path.join(pRoot, 'src'),
		serverIndex: './core/server.ts', // This file runs on the server only.
		clientIndex: './core/client.ts', // This file runs on the client only.
		configModules: './core/configModules.ts', // This file needs to be isomorphic (client/server)
	},
	web: {
		template: path.join(iRoot, 'resource/index.html'),
		title: 'Imperium Project',
		meta: {
			'mobile-web-app-capable': 'yes',
		},
		options: {},
	},
};
