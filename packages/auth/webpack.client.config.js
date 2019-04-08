const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	mode: process.env.NODE_ENV,
	devtool: 'source-map',
	entry: {
		client: './src/client/index.ts',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'lib'),
		library: 'auth',
		libraryTarget: 'umd',
		umdNamedDefine: true,
		globalObject: 'this',
	},
	externals: [
		nodeExternals({modulesDir: path.join('..', '..', 'node_modules')}),
	],
	optimization: {
		minimize: process.env.NODE_ENV === 'production',
	},
	resolve: {
		extensions: ['.js', '.mjs', '.ts', '.tsx'],
	},
	module: {
		rules: [
			{
				test: /\.[tj]sx?$/,
				exclude: '/node_modules/',
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [['@imperium/babel-preset-imperium', {
								client: true,
								typescript: true,
							}]],
						},
					},
				],
			},
			{
				test: /\.graphqls?$/,
				exclude: '/node_modules/',
				use: [
					{
						loader: 'graphql-tag/loader',
					},
				],
			},
			{
				test: /\.css$/,
				exclude: '/node_modules/',
				use: [
					{loader: 'style-loader'},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[path][name]__[local]--[hash:base64:5]',
						},
					},
				],
			},
		],
	},
};
