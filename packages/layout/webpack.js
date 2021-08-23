/* eslint-disable @typescript-eslint/no-var-requires */
const {commonWebpack, inspectLoader} = require('@thx/common-webpack');
const {name} = require('./package.json');

module.exports = commonWebpack({
	isProduction: process.env.NODE_ENV === 'production',
	isClient: true,
	name,
	entry: './index.ts',
	outputFile: 'client.js',
	rules: [
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
	],
});
