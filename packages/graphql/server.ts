const server = require('./lib/server').default;

module.exports = function ImperiumGraphqlModule() {
	return {
		endpoints: server.endpoints,
		initialConfig: server.initialConfig,
	};
};
