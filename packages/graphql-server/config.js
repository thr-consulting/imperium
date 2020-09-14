/* eslint-disable @typescript-eslint/no-var-requires */
const {inspectLoader} = require('@thx/common-webpack');
const {name} = require('./package.json');

module.exports = function() {
	return {
		name,
		webpack: {
			server: {
				rules: [
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
		},
	};
};
