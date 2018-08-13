/* eslint-disable import/no-dynamic-require */
const path = require('path');
const babelRegExps = [
	path.resolve(__dirname, '..', '..', '..'), // Match imperium packages
	path.resolve(process.cwd(), 'src'), // Match project folder
];

require('@babel/register')({
	presets: [['@imperium/babel-preset-imperium',	{client: false}]],
	only: [
		function(filepath) {
			// Iterate over allowed paths
			return babelRegExps.reduce((memo, value) => {
				if (new RegExp(`${value}/.*`).test(filepath)) {
					// If node_modules exists in the relative path, do flag as valid file
					if (/node_modules/.test(path.relative(value, filepath))) {
						return memo;
					}
					// console.log(filepath);
					return true;
				}
				return memo;
			}, false);
		},
	],
});
const webpack = require('webpack');
const SCWorker = require('socketcluster/scworker');
const d = require('debug')('imperium.core.server.WorkerDev');
const worker = require('./worker').default;
const webpackConfig = require('../../webpack/client.dev');
const config = require('../../config');

// In development mode, we dynamically import our project definition code
const Connectors = require(path.join(process.cwd(), config.project.Connectors)).default;
const serverModules = require(path.join(process.cwd(), config.project.serverModules)).default;

// Catch unhandled rejections
process.on('unhandledRejection', (reason, p) => {
	d('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

/**
 * Adds webpack-dev-middleware and HMR to the express app
 * @param app
 * @returns {*}
 */
function hmr(app) {
	d('Webpack and HMR loading');

	// Webpack dev middleware - Compiles client code on the fly and in memory
	const compiler = webpack(webpackConfig);
	const hmrInstance = require('webpack-dev-middleware')(compiler, { // eslint-disable-line global-require
		publicPath: webpackConfig.output.publicPath,
	});
	app.use(hmrInstance);

	// Add Webpack HMR
	app.use(require('webpack-hot-middleware')(compiler)); // eslint-disable-line global-require

	return hmrInstance;
}

class Worker extends SCWorker {
	run() {
		worker(this, {
			hmr,
			Connectors,
			serverModules,
		});
	}
}

new Worker(); // eslint-disable-line no-new
