/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const packageJson = require('../package.json');

module.exports = {
	mode: 'production',
	context: path.resolve(__dirname, '..', 'src'),
	target: 'web',
	devtool: 'source-map',
	entry: './ImperiumClient.tsx',
	externals: [
		nodeExternals({modulesDir: 'node_modules'}),
		nodeExternals({modulesDir: path.join('..', '..', 'node_modules')}),
	],
	output: {
		filename: 'ImperiumClient.js',
		path: path.resolve(__dirname, '..', 'lib'),
		library: packageJson.name,
		libraryTarget: 'commonjs2',
		// globalObject: 'this',
	},
	resolve: {
		extensions: ['.js', '.mjs', '.ts', '.tsx', '.d.ts'],
	},
	optimization: {
		minimize: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
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
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [['@imperium/babel-preset-imperium', {client: true, typescript: true}]],
						},
					},
				],
			},
		],
	},
};
