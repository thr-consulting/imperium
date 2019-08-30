/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const packageJson = require('../package.json');

module.exports = {
	mode: 'production',
	context: path.resolve(__dirname, '..', 'src'),
	target: 'node',
	devtool: 'source-map',
	entry: './server/index.ts',
	externals: [
		nodeExternals({modulesDir: 'node_modules'}),
		nodeExternals({modulesDir: path.join('..', '..', 'node_modules')}),
	],
	output: {
		filename: 'server.js',
		path: path.resolve(__dirname, '..'),
		library: packageJson.name,
		libraryTarget: 'commonjs2',
	},
	resolve: {
		extensions: ['.js', '.mjs', '.ts', '.d.ts'],
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
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [
								[
									'@imperium/babel-preset-imperium',
									{client: false, typescript: true},
								],
							],
						},
					},
				],
			},
			// {
			// 	test: /\.ts$/,
			// 	exclude: /node_modules/,
			// 	use: 'ts-loader',
			// }
		],
	},
};
