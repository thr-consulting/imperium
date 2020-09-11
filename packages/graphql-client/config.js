/* eslint-disable @typescript-eslint/no-var-requires */
const {inspectLoader} = require('@thx/common-webpack');
const {name} = require('./package.json');

module.exports = function() {
	return {
		name,
		webpack: {
			client: {
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
			},
		},
	};
};
