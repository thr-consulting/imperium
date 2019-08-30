/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * This webpack configuration is used when building the production client app.
 */
const path = require('path');
const compact = require('lodash/compact');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const clientModuleRules = require('./clientModuleRules');

// Webpack configuration
module.exports = function(imperiumConfig) {
	return {
		mode: 'production',
		context: imperiumConfig.source.path,
		devtool: imperiumConfig.build.client.devtool,
		entry: {
			app: imperiumConfig.source.clientIndex,
			vendor: imperiumConfig.build.client.vendorChunk,
		},
		output: {
			filename: '[name]_[chunkhash].js',
			chunkFilename: '[name]_[chunkhash].js',
			path: path.join(imperiumConfig.build.path, 'client', 'static'),
			publicPath: '/static/',
		},
		resolve: {
			extensions: ['.js', '.mjs', '.ts', '.tsx', '.d.ts'],
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: 'vendor',
						name: 'vendor',
						chunks: 'all',
						enforce: true,
					},
				},
			},
			runtimeChunk: {
				name: 'manifest',
			},
			minimize: imperiumConfig.build.client.minimize,
		},
		plugins: compact([
			process.env.DEBUG ? null : new ProgressBarPlugin(),
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				analyzerPort: 8923,
				reportFilename: path.join('..', '..', 'report-client.html'),
				openAnalyzer: false,
			}),
			new CopyWebpackPlugin([{from: path.resolve('assets'), to: 'assets/'}]),
			new HtmlWebpackPlugin({
				filename: '../index.html',
				title: imperiumConfig.web.title,
				template: imperiumConfig.web.template,
				meta: imperiumConfig.web.meta,
				templateOptions: Object.assign({}, imperiumConfig.web.options, {
					initialConfig: JSON.stringify({}),
				}),
			}),
		]),
		module: {
			rules: clientModuleRules.concat(imperiumConfig.build.client.rules),
		},
	};
};
