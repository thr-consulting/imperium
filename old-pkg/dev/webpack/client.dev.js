/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * This webpack configuration is used when running the development version of the client app.
 * The server portion calls Webpack, loads this config and starts the server.
 */
const path = require('path');
const compact = require('lodash/compact');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const clientModuleRules = require('./clientModuleRules');

// Webpack configuration
module.exports = function webpackConfig(imperiumConfig) {
	// Default alias for development is to replace react-dom with HMR one.
	const alias = {
		'react-dom': '@hot-loader/react-dom',
	};

	// This will make sure we're not using different packages when yalc or npm link is being used.
	if (imperiumConfig.development.imperiumDevelopmentAliases) {
		alias['react-router-dom'] = path.resolve(imperiumConfig.source.projectRoot, './node_modules/react-router-dom');
		alias['@apollo/react-hooks'] = path.resolve(imperiumConfig.source.projectRoot, './node_modules/@apollo/react-hooks');
	}

	return imperiumConfig.webpack.custom({
		mode: 'development',
		devtool: 'source-map',
		context: imperiumConfig.source.path,
		entry: {
			app: [imperiumConfig.source.clientIndex],
		},
		output: {
			filename: 'app.js',
			publicPath: '/',
		},
		resolve: {
			extensions: ['.js', '.mjs', '.ts', '.tsx', '.d.ts'],
			// alias,
		},
		optimization: {
			minimize: false,
			emitOnErrors: false,
		},
		devServer: {
			host: imperiumConfig.development.clientHost,
			port: parseInt(imperiumConfig.development.clientPort, 10),
			hot: true,
			historyApiFallback: true, // https://tylermcginnis.com/react-router-cannot-get-url-refresh/
			static: {
				directory: imperiumConfig.source.projectRoot,
			},
		},
		stats: 'errors-warnings',
		plugins: compact([
			new ProgressBarPlugin(),
			new CopyWebpackPlugin({
				patterns: [{from: path.resolve('assets'), to: 'assets/', noErrorOnMissing: true}],
			}),
			new HtmlWebpackPlugin(imperiumConfig.html),
			new ReactRefreshWebpackPlugin({
				overlay: false,
			}),
		]),
		module: {
			rules: clientModuleRules(imperiumConfig).concat(imperiumConfig.webpack.client.rules),
		},
	});
};
