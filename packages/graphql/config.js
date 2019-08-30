/* eslint-disable @typescript-eslint/no-var-requires */
const {name} = require('./package.json');

module.exports = function() {
	return {
		name,
		initialConfig: {
			graphql: `${process.env.GRAPHQL_HOST}/api/graphql`,
		},
		webpack: {
			client: {
				rules: [
					{
						test: /\.graphql$/,
						exclude: /node_modules/,
						use: [
							// inspectLoader('GRAPHQLS'),
							{
								loader: 'graphql-tag/loader',
							},
						],
					},
				],
			},
			server: {
				rules: [
					{
						test: /\.graphqls$/,
						exclude: /node_modules/,
						use: [
							// inspectLoader('GRAPHQLS'),
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
