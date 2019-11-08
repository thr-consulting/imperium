/* eslint-disable @typescript-eslint/no-var-requires */
const {commonWebpack, inspectLoader} = require('@imperium/util');
const {name} = require('../package.json');

module.exports = commonWebpack({
	isProduction: process.env.NODE_ENV === 'production',
	isClient: true,
	name,
	entry: './client/index.ts',
	outputFile: 'client.js',
	rules: [
		{
			test: /\.graphql$/,
			exclude: /node_modules/,
			use: [
				inspectLoader('GRAPHQL'),
				{
					loader: 'graphql-tag/loader',
				},
			],
		},
	],
});
