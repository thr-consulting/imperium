const client = require('./lib/client').default;

module.exports = function ImperiumGraphqlModule() {
	return {
		startup: client.startup,
	};
};
