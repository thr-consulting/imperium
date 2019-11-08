/* eslint-disable @typescript-eslint/no-var-requires */
const {commonWebpack} = require('@imperium/util');
const {name} = require('../package.json');

module.exports = commonWebpack({
	isProduction: process.env.NODE_ENV === 'production',
	isClient: true,
	name,
	entry: './index.ts',
	outputFile: 'client.js',
});
