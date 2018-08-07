/* eslint-disable no-console */
const chalk = require('chalk');
require('@babel/register')({
	presets: [['@imperium/babel-preset-imperium',	{client: false}]],
	only: [
		function(filepath) {
			return /src\/.*/.test(filepath);
		},
	],
});
const server = require('../src/server').default;

console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-='));
console.log(chalk.bold.white('  Imperium Framework - Dev'));
console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-='));

server();
