const server = require('./lib/server').default;

module.exports = function ImperiumAuthModule() {
	return {
		models: server.models,
		startup: server.startup,
		schema: server.schema,
		resolvers: server.resolvers,
	};
};
