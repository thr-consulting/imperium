/* eslint-disable no-console */
const chalk = require('chalk');
const path = require('path');
const isSourceFile = require('../webpack/isSourceFile');

// Override require() with babel's require for host project and imperium core folders
require('@babel/register')({
	presets: [['@imperium/babel-preset-imperium',	{client: false}]],
	only: [
		isSourceFile([
			path.resolve(__dirname, '..', '..'), // Match imperium core package
			path.resolve(process.cwd(), 'src'), // Match project folder
		], 'BABEL/REG'),
	],
	cache: false,
});

// Include the main server file
const server = require('../src/server').default;

console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-='));
console.log(chalk.bold.white('  Imperium Framework - Dev'));
console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-='));

// Start the server
server();
