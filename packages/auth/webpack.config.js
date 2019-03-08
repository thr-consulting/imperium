const path = require('path');
const nodeExternals = require('webpack-node-externals');
const isSourceFile = require('./isSourceFile');

const src = path.resolve(__dirname, 'src');

module.exports = {
	mode: process.env.NODE_ENV,
	devtool: 'source-map',
	entry: {
		client: './src/client/client.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'lib', 'client'),
		library: ['Auth', '[name'],
		libraryTarget: 'umd',
	},
	externals: [
		nodeExternals({modulesDir: path.join('..', '..', 'node_modules')}),
	],
	module: {
		rules: [
			{
				test: /\.graphql$/,
				include: isSourceFile([src]),
				use: [
					{
						loader: 'graphql-tag/loader',
					},
				],
			},
			{
				test: /\.js$/,
				include: isSourceFile([src]),
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [['@imperium/babel-preset-imperium', {client: true}]],
						},
					},
				],
			},
			{
				test: /\.css$/,
				include: isSourceFile([src]),
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
