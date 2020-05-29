/* eslint-disable @typescript-eslint/no-var-requires */
const {inspectLoader} = require('@imperium/util');
const {name} = require('./package.json');

module.exports = function() {
	const proto = process.env.SERVER_PROTOCOL || 'http';
	const host = process.env.SERVER_HOST || 'localhost';
	const port = parseInt(process.env.SERVER_PORT || '4001', 10);
	const url = process.env.GRAPHQL_URL || '/api/graphql';
	const enableGraphqlWs = process.env.GRAPHQL_ENABLE_SUBSCRIPTIONS === 'true';

	return {
		name,
		initialConfig: {
			graphql: `${proto}://${host}:${port}${url}`,
			graphqlws: enableGraphqlWs ? `ws://${host}:${port}${url}` : false,
		},
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
