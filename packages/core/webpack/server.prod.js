/**
 * This webpack configuration is used when building the production server app.
 */
const path = require('path');
const Visualizer = require('webpack-visualizer-plugin');
const nodeExternals = require('webpack-node-externals');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

const iRoot = path.resolve(__dirname, '..');
const iSrcDir = path.join(iRoot, 'src');

const pRoot = path.resolve(process.cwd());
const pSrcDir = path.join(pRoot, 'src', 'imperium');

const pBuildDir = path.join(pRoot, 'build');

const serverInclude = [path.join(iSrcDir, 'server')];

const conf = {
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
			Connectors$: path.join(pSrcDir, 'Connectors.js'),
			serverModules$: path.join(pSrcDir, 'serverModules.js'),
			'assets.json$': path.join(pBuildDir, 'assets.json'),
		},
	},
	externals: [
		nodeExternals({modulesDir: path.join(iRoot, '..', '..', 'node_modules')}),
		nodeExternals({modulesDir: path.join(pRoot, 'node_modules')}),
	],
	// optimization: {
	// 	minimize: false,
	// },
	node: {
		__dirname: false,
		__filename: false,
	},
	plugins: [
		new ProgressBarPlugin(),
		new Visualizer({filename: 'stats-server.html'}),
	],
	module: {
		rules: [
			// {
			// 	test: /\.graphqls$/,
			// 	exclude: /node_modules/,
			// 	use: [{
			// 		loader: 'graphql-tag/loader',
			// 	}],
			// },
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

module.exports = conf;
