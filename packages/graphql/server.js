const endpoints = require('./lib/server/endpoints');
const initialConfig = require('./lib/server/initialConfig');

module.exports = function() {
	return {
		endpoints,
		initialConfig,
	};
};
