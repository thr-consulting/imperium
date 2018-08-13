/**
 * This webpack configuration is used when building the production server app.
 */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const config = require('../config');

const iRoot = path.resolve(__dirname, '..');
const iSrcDir = path.join(iRoot, 'src');
const pRoot = path.resolve(process.cwd());
const pBuildDir = path.join(pRoot, config.production.buildDir);

// const serverInclude = [path.join(iSrcDir, 'server')];
const serverInclude = [path.join(iRoot, '..')];

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
	plugins: [
		new ProgressBarPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.graphqls$/,
				exclude: /node_modules/,
				use: [{
					loader: 'graphql-tag/loader',
				}],
			},
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader',
					options: {
						babelrc: false,
						presets: [['@imperium/babel-preset-imperium', {client: false}]],
					},
				}],
				include: serverInclude,
			},
		],
	},
};
