/* eslint-disable @typescript-eslint/no-var-requires */
const mergeOptions = require('merge-options');
const {inspectLoader} = require('@imperium/dev');

module.exports = mergeOptions(require('./common'), {
	target: 'web',
	entry: './client/index.ts',
	output: {
		filename: 'client.js',
	},
	resolve: {
		extensions: ['.tsx'],
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
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					inspectLoader('BABEL-TS'),
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
});
