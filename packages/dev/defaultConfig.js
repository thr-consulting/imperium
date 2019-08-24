const path = require('path');

const iRoot = path.resolve(__dirname);
const pRoot = path.resolve(process.cwd());

module.exports = {
	development: {
		clientPort: 4000,
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
		path: path.join(pRoot, 'src'),
		webTemplate: path.join(iRoot, 'webpack/index.html'),
		serverIndex: './core/server/index.ts',
		clientIndex: './core/client/index.tsx',
	}
};
