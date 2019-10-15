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
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const clientModuleRules = require('./clientModuleRules');

// Webpack configuration
module.exports = function(imperiumConfig) {
	return {
		mode: 'development',
		devtool: 'eval',
		context: imperiumConfig.source.path,
		entry: {
			app: imperiumConfig.source.clientIndex,
		},
		output: {
			filename: 'static/app.js',
		},
		resolve: {
			extensions: ['.js', '.mjs', '.ts', '.tsx', '.d.ts'],
			alias: {
				'react-dom': '@hot-loader/react-dom',
			},
		},
		optimization: {
			minimize: false,
			noEmitOnErrors: true,
		},
		devServer: {
			stats: 'errors-warnings',
			hot: true,
			historyApiFallback: true,
		},
		stats: 'errors-warnings',
		plugins: compact([
			new ProgressBarPlugin(),
			new CopyWebpackPlugin([{from: path.resolve('assets'), to: 'assets/'}]),
			new HtmlWebpackPlugin(imperiumConfig.html),
			new HardSourceWebpackPlugin({
				cacheDirectory: path.resolve(imperiumConfig.source.projectRoot, 'node_modules', '.cache', 'hard-source'),
			}),
		]),
		module: {
			rules: clientModuleRules.concat(imperiumConfig.webpack.client.rules),
		},
	};
};
