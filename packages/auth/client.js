const client = require('./lib/client');

module.exports = function ImperiumAuthModule() {
	return {
		routes: client.routes,
		startup: client.startup,
	};
};

module.exports.AuthContextConsumer = client.AuthContextConsumer;
module.exports.AuthContextProvider = client.AuthContextProvider;
