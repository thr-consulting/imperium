/* eslint-disable @typescript-eslint/no-var-requires */
const {inspectLoader} = require('@imperium/util');
const {name} = require('./package.json');

module.exports = function() {
	const config = {
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

	return config;
};
