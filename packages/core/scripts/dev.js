/* eslint-disable no-console */
const chalk = require('chalk');
const path = require('path');
const isSourceFile = require('../webpack/isSourceFile');

require('@babel/register')({
	presets: [['@imperium/babel-preset-imperium',	{client: false}]],
	only: [
		isSourceFile([
			path.resolve(__dirname, '..', '..'), // Match imperium core package
			path.resolve(process.cwd(), 'src'), // Match project folder
		], 'BABEL/REG'),
	],
});
const server = require('../src/server').default;

console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-='));
console.log(chalk.bold.white('  Imperium Framework - Dev'));
console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-='));

server();
