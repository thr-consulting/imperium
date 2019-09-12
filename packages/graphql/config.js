/* eslint-disable @typescript-eslint/no-var-requires */
const {inspectLoader} = require('@imperium/dev');
const {name} = require('./package.json');

module.exports = function() {
	const proto = process.env.PROTOCOL || 'http';
	const host = process.env.HOST || 'localhost';
	const port = process.env.PORT || 4001;
	const url = process.env.GRAPHQL_URL || '/api/graphql';

	return {
		name,
		initialConfig: {
			graphql: `${proto}://${host}:${port}${url}`,
		},
		webpack: {
			client: {
				rules: [
					{
						test: /\.graphql$/,
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
