/* eslint-disable @typescript-eslint/no-var-requires */
const {inspectLoader} = require('@imperium/util');

/* ************************************************************
	Common server webpack module rules
 ************************************************************** */

module.exports = [
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
];
