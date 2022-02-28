/* eslint-disable @typescript-eslint/no-var-requires */
const {inspectLoader} = require('@thx/common-webpack');

/* ************************************************************
	Common server webpack module rules
 ************************************************************** */

module.exports = function serverModuleRules(imperiumConfig) {
	return [
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
						presets: [
							[
								'@imperium/babel-preset-imperium',
								{
									client: false,
									typescript: true,
									alias: imperiumConfig.source.aliasPaths,
								},
							],
						],
					},
				},
			],
		},
		{
			test: /\.mjs$/,
			include: /node_modules/,
			type: 'javascript/auto',
			use: [inspectLoader('NODE-MJS')],
		},
	];
};
