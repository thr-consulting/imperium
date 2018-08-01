require('@babel/register')({
	presets: [['@imperium/babel-preset-imperium',	{client: false}]],
	only: [
		function(filepath) {
			// console.log(filepath);
			return /src\/.*/.test(filepath);
		},
	],
});
const server = require('../src/server').default;

server();
