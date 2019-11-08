/* eslint-disable @typescript-eslint/no-var-requires */
const mergeOptions = require('merge-options');
const {inspectLoader} = require('@imperium/util');

module.exports = mergeOptions(require('./common'), {
	target: 'node',
	entry: './server/index.ts',
	output: {
		filename: 'server.js',
	},
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
			{
				test: /\.graphqls$/,
				exclude: /node_modules/,
				use: [
					inspectLoader('GRAPHQLS'),
					{
						loader: 'graphql-tag/loader',
					},
				],
			},
		],
	},
});
