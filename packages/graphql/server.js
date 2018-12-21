const endpoints = require('./lib/server/endpoints').default;
const initialConfig = require('./lib/server/initialConfig').default;

module.exports = function() {
	return {
		endpoints,
		initialConfig,
	};
};
