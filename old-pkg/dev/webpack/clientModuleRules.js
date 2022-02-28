/* eslint-disable @typescript-eslint/no-var-requires */
const {inspectLoader} = require('@thx/common-webpack');

/* ************************************************************
	Common client webpack module rules
 ************************************************************** */

module.exports = function clientModuleRules(imperiumConfig) {
	return [
		{
			test: /\.txt$/,
			type: 'asset/source',
		},
		{
			test: /\.(woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
			type: 'asset',
		},
		{
			test: /\.(png|jpg|jpeg|gif|svg)$/,
			type: 'asset',
		},
		{
			test: /\.(wav|mp3)$/,
			type: 'asset/resource',
		},
		{
			test: /\.css$/,
			exclude: /node_modules/,
			use: [
				inspectLoader('CSS-MODULE'),
				{loader: 'style-loader'},
				{
					loader: 'css-loader',
					options: {
						modules: {
							localIdentName: '[path][name]__[local]--[hash:base64:5]',
						},
					},
				},
			],
		},
		{
			test: /\.css$/,
			include: /node_modules/,
			use: [
				inspectLoader('CSS'),
				{loader: 'style-loader'},
				{
					loader: 'css-loader',
					options: {
						modules: false,
					},
				},
			],
		},
		{
			test: /\.js$/,
			exclude: /node_modules/,
			use: [
				inspectLoader('BABEL'),
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
			test: /\.tsx?$/,
			exclude: /node_modules/,
			use: [
				inspectLoader('BABEL-TS'),
				{
					loader: 'babel-loader',
					options: {
						babelrc: false,
						presets: [['@imperium/babel-preset-imperium', {client: true, typescript: true, alias: imperiumConfig.source.aliasPaths}]],
					},
				},
			],
		},
		{
			test: /\.mjs$/,
			include: /node_modules/,
			type: 'javascript/auto',
		},
	];
};
