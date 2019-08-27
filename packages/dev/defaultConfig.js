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
		},
		server:{
			minimize: true,
			devtool: false,
			externals: [
				path.join(pRoot, 'node_modules'),
				path.join(pRoot, '..', '..', 'node_modules'), // Needed if the project is a lerna project
			]
		},
	},
	source: {
		projectRoot: pRoot,
		imperiumRoot: iRoot,
		path: path.join(pRoot, 'src'),
		serverIndex: './core/server.ts',
		clientIndex: './core/client.tsx',
		serverModules: './core/serverModules.ts',
		clientModules: './core/clientModules.ts',
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
