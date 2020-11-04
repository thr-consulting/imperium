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
module.exports = function clientWebpack(imperiumConfig) {
	return {
		mode: 'production',
		context: imperiumConfig.source.path,
		devtool: imperiumConfig.production.client.devtool,
		entry: {
			app: imperiumConfig.source.clientIndex,
			vendor: imperiumConfig.production.client.vendorChunk,
		},
		output: {
			filename: '[name]_[chunkhash].js',
			chunkFilename: '[name]_[chunkhash].js',
			path: path.join(imperiumConfig.production.path, 'client', 'static'),
			publicPath: '/static/',
		},
		node: {
			fs: 'empty',
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
			minimize: imperiumConfig.production.client.minimize,
		},
		plugins: compact([
			process.env.DEBUG ? null : new ProgressBarPlugin(),
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				analyzerPort: 8923,
				reportFilename: path.join('..', '..', 'report-client.html'),
				openAnalyzer: false,
			}),
			new CopyWebpackPlugin({
				patterns: [{from: path.resolve('assets'), to: 'assets/', noErrorOnMissing: true}],
			}),
			new HtmlWebpackPlugin({
				...imperiumConfig.html,
				filename: '../index.html',
			}),
		]),
		module: {
			rules: clientModuleRules(imperiumConfig).concat(imperiumConfig.webpack.client.rules),
		},
	};
};
