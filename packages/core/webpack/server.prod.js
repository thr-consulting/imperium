/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const compact = require('lodash/compact');
const nodeExternals = require('webpack-node-externals');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const inspectLoader = require('./inspectLoader').default;

module.exports = function(imperiumConfig) {
	return {
		mode: 'production',
		context: imperiumConfig.source.path,
		target: 'node',
		devtool: imperiumConfig.build.server.devtool,
		entry: imperiumConfig.source.serverIndex,
		externals: imperiumConfig.build.server.externals.map(v => nodeExternals({modulesDir: v})),
		output: {
			filename: 'worker.js',
			path: path.join(imperiumConfig.build.path, 'server'),
			libraryTarget: 'commonjs2',
		},
		resolve: {
			extensions: ['.js', '.mjs', '.ts', '.d.ts'],
		},
		optimization: {
			minimize: imperiumConfig.build.server.minimize,
		},
		plugins: compact([
			process.env.DEBUG ? null : new ProgressBarPlugin(),
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				analyzerPort: 8923,
				reportFilename: path.join('..', 'report-server.html'),
				openAnalyzer: false,
			}),
		]),
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [
						inspectLoader('BABEL'),
						{
							loader: 'babel-loader',
							options: {
								babelrc: false,
								presets: [['@imperium/babel-preset-imperium', {client: false}]],
							},
						},
					],
				},
				{
					test: /\.ts$/,
					exclude: /node_modules/,
					use: [
						inspectLoader('BABEL-TS'),
						{
							loader: 'babel-loader',
							options: {
								babelrc: false,
								presets: [['@imperium/babel-preset-imperium', {client: false, typescript: true}]],
							},
						},
					],
				},
			],
		},
	};
};
