/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const packageJson = require('./package.json');

module.exports = {
	mode: 'production',
	context: path.resolve(__dirname, 'src'),
	target: 'node',
	// devtool: false,
	entry: {
		ImperiumServer: './ImperiumServer.ts',
		ImperiumClient: './ImperiumClient.ts',
	},
	externals: [
		nodeExternals({modulesDir: 'node_modules'}),
		nodeExternals({modulesDir: path.join('..', '..', 'node_modules')}),
	],
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'lib'),
		library: packageJson.name,
		libraryTarget: 'umd',
		globalObject: 'this',
	},
	resolve: {
		extensions: ['.js', '.mjs', '.ts', '.d.ts'],
	},
	optimization: {
		minimize: false,
		splitChunks: {
			name: 'vendor',
			minChunks: 2,
		},
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
							presets: [['@imperium/babel-preset-imperium', {client: false, typescript: true}]],
						},
					},
				],
			},
		],
	},
};
