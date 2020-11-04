/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const compact = require('lodash/compact');
const nodeExternals = require('webpack-node-externals');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const webpack = require('webpack');
const serverModuleRules = require('./serverModuleRules');

module.exports = function serverWebpack(imperiumConfig) {
	return {
		mode: 'production',
		context: imperiumConfig.source.path,
		target: 'node',
		devtool: imperiumConfig.production.server.devtool,
		entry: imperiumConfig.source.serverIndex,
		externals: nodeExternals({
			additionalModuleDirs: imperiumConfig.production.server.externals,
		}),
		output: {
			filename: 'worker.js',
			path: path.join(imperiumConfig.production.path, 'server'),
			libraryTarget: 'commonjs2',
		},
		resolve: {
			extensions: ['.mjs', '.js', '.ts', '.d.ts'],
		},
		optimization: {
			minimize: imperiumConfig.production.server.minimize,
		},
		plugins: compact([
			process.env.DEBUG ? null : new ProgressBarPlugin(),
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				analyzerPort: 8923,
				reportFilename: path.join('..', 'report-server.html'),
				openAnalyzer: false,
			}),
			new CopyWebpackPlugin({
				patterns: [{from: path.resolve(imperiumConfig.source.imperiumRoot, 'resource', 'index.js'), to: '.', noErrorOnMissing: true}],
			}),
			imperiumConfig.production.server.sourceMapSupport
				? new webpack.BannerPlugin({
						banner: "require('source-map-support').install();",
						raw: true,
						entryOnly: false,
				  })
				: null,
		]),
		module: {
			rules: serverModuleRules(imperiumConfig).concat(imperiumConfig.webpack.server.rules),
		},
	};
};
