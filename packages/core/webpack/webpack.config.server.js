/**
 * This webpack configuration is used when building the inital startup index.js file for the production server app.
 * The startup index file is very light and basically just starts SocketCluster. SockerCluster then loads the worker
 * module for each thread.
 */
const path = require('path');
// const Visualizer = require('webpack-visualizer-plugin');
const nodeExternals = require('webpack-node-externals');

const root = process.cwd();
const srcDir = path.join(root, 'src');
const buildDir = path.join(root, 'lib');

const serverInclude = [path.join(srcDir, 'server')];

const conf = {
	mode: process.env.NODE_ENV,
	context: srcDir,
	entry: {
		index: './server/index.js',
		broker: './server/broker.js',
		WorkerProd: './server/WorkerProd.js',
	},
	target: 'node',
	output: {
		filename: '[name].js',
		chunkFilename: '[name].js',
		path: buildDir,
		library: 'server',
		libraryTarget: 'commonjs2',
	},
	externals: [nodeExternals({
		modulesDir: path.join(root, '..', '..', 'node_modules'),
	})],
	optimization: {
		minimize: false,
	},
	node: {
		__dirname: false,
		__filename: false,
	},
	plugins: [
		// new Visualizer({filename: 'stats-server.html'}),
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
