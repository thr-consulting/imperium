/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const iRoot = path.resolve(__dirname);
const pRoot = path.resolve(process.cwd());

module.exports = {
	// Only affects running in development mode
	development: {
		clientHost: '127.0.0.1',
		clientPort: 4000, // Port the webpack-dev-server runs on
		imperiumDevelopmentAliases: false, // Enable this if you are working on the imperium library installed with yalc or npm link.
		chokidarTimeout: 200, // Number of milliseconds to debounce the server restart in development mode.
	},
	// Only affects building production of apps
	production: {
		path: path.join(pRoot, 'build'), // Path to place the build files
		client: {
			minimize: true, // Minimize the production output
			devtool: false, // Devtool built for production (See https://webpack.js.org/configuration/devtool/#devtool)
			vendorChunk: ['react', 'react-dom', 'lodash', 'debug', 'semantic-ui-css', 'semantic-ui-react', 'graphql', 'react-router-dom', '@apollo/client'], // Vendor packages to split into their own chunk
		},
		server: {
			minimize: true, // Minimize the production output
			devtool: 'source-map', // Devtool build for production
			sourceMapSupport: true, // Add support for sourcemaps in production
			// Externals aren't included in webpack. (See https://webpack.js.org/configuration/externals/#externals)
			externals: [
				path.join(pRoot, 'node_modules'),
				path.join(pRoot, '..', 'node_modules'),
				path.join(pRoot, '..', '..', 'node_modules'),
				path.join(pRoot, '..', '..', '..', 'node_modules'),
			],
		},
	},
	webpack: {
		client: {
			rules: [], // Additional webpack rules (See https://webpack.js.org/configuration/module/#modulerules)
		},
		server: {
			rules: [], // Additional webpack rules (See https://webpack.js.org/configuration/module/#modulerules)
		},
	},
	// Source code locations
	source: {
		projectRoot: pRoot, // Usually don't override this. It's determined from cwd.
		imperiumRoot: iRoot, // Usually don't override this. It's determined from __dirname.
		path: path.join(pRoot, 'src'), // The folder where source code is located.
		// The next 3 entries are required "magically".
		serverIndex: './core/server.ts', // This file runs on the server only.
		clientIndex: './core/client.tsx', // This file runs on the client only.
		configModules: './core/configModules.ts', // This file needs to be isomorphic (client/server)
		// You can add more paths to the client/server auto-restart/HMR watching tools
		watchPaths: [],
		// This will use tsconfig.json to generate aliasPaths
		useTsconfigAlias: true,
		// Alias folders in your source. Like {'~aliasname1': './src/myfolder'}
		aliasPaths: null,
	},
	// Configuration for HTML generation (production and development) (See https://github.com/jantimon/html-webpack-plugin#options)
	html: {
		template: path.join(iRoot, 'resource/index.html'), // Path to the web template to use. Uses lodash style templates.
		meta: {
			'mobile-web-app-capable': 'yes',
		},
		templateParameters: {
			title: 'Imperium Project', // The default title included in the HTML file.
		},
	},
};
