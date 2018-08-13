/**
 * This webpack configuration is used when building the production server app.
 */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const compact = require('lodash/compact');
const config = require('../config');
const inspectLoader = require('./inspectLoader').default;
const isSourceFile = require('./isSourceFile');

const iRoot = path.resolve(__dirname, '..');
const iSrcDir = path.join(iRoot, 'src');
const pRoot = path.resolve(process.cwd());
const pSrcDir = path.join(pRoot, 'src');
const pBuildDir = path.join(pRoot, config.production.buildDir);

// Webpack config
module.exports = {
	mode: process.env.NODE_ENV,
	context: iSrcDir,
	entry: {
		index: './server/index.js',
		broker: './server/broker.js',
		WorkerProd: './server/WorkerProd.js',
	},
	target: 'node',
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
		path: pBuildDir,
		library: 'server',
		libraryTarget: 'commonjs2',
	},
	resolve: {
		alias: {
			// These aliases are so we can 'dynamically' include code from our project
			Connectors$: path.join(pRoot, config.project.Connectors),
			serverModules$: path.join(pRoot, config.project.serverModules),
		},
	},
	externals: [
		nodeExternals({modulesDir: path.join(iRoot, '..', '..', 'node_modules')}), // TODO this won't be quite right after publishing
		nodeExternals({modulesDir: path.join(pRoot, 'node_modules')}),
	],
	optimization: {
		minimize: config.production.minimize,
	},
	node: {
		__dirname: false,
		__filename: false,
	},
	plugins: compact([
		process.env.DEBUG ? null : new ProgressBarPlugin(),
	]),
	module: {
		rules: [
			{
				test: /\.graphqls$/,
				include: isSourceFile([iSrcDir, pSrcDir]),
				use: [
					inspectLoader('GRAPHQLS'),
					{
						loader: 'graphql-tag/loader',
					},
				],
			},
			{
				test: /\.js$/,
				include: isSourceFile([iSrcDir, pSrcDir]),
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
		],
	},
};
