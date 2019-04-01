const server = require('./lib/server').default;

module.exports = function() {
	return {
		endpoints: server.endpoints,
		initialConfig: server.initialConfig,
	};
};
