/* eslint-disable @typescript-eslint/no-var-requires */
const {commonWebpack, getTsconfigAliasPaths} = require('@thx/common-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const {name} = require('./package.json');
const tsconfig = require('./tsconfig.json');

const wp = commonWebpack({
	isProduction: process.env.NODE_ENV === 'production',
	isClient: false,
	name,
	entry: './index.ts',
	outputFile: 'index.js',
	aliasPaths: getTsconfigAliasPaths(tsconfig, {}),
});

wp.optimization.minimizer = [
	new TerserPlugin({
		terserOptions: {
			keep_classnames: true,
		},
	}),
];

module.exports = wp;
