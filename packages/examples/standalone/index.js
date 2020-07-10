'use strict';
require('dotenv').config();

const runAsService = process.env.RUN_AS_SERVICE === 'true';

if (process.env.NODE_ENV === 'production') {
	const main = require('./dist/index.js');
	main.main();
} else {
	require('@babel/register')({
		presets: [['@imperium/babel-preset-imperium', {client: false, typescript: true}]],
		extensions: ['.ts'],
		ignore: [/node_modules/],
		only: [
			(filepath) => {
				return true;
			},
		],
	});

	const main = require('./src/index');
	main.main().then(() => {
		if (!runAsService) process.exit(0);
	});
}
