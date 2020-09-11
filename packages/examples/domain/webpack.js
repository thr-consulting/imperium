/* eslint-disable @typescript-eslint/no-var-requires */
const {commonWebpack} = require('@thx/common-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const {name} = require('./package.json');

const wp = commonWebpack({
	isProduction: process.env.NODE_ENV === 'production',
	isClient: false,
	name,
	entry: './index.ts',
	outputFile: 'index.js',
});

wp.optimization.minimizer = [
	new TerserPlugin({
		terserOptions: {
			keep_classnames: true,
		},
	}),
];

module.exports = wp;
