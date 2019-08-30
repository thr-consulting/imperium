/* eslint-disable @typescript-eslint/no-var-requires */
const mergeOptions = require('merge-options');

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
		],
	},
});
