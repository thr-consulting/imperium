const client = require('./lib/client');

module.exports = function ImperiumAuthModule() {
	return {
		routes: client.routes,
		startup: client.startup,
		pre: client.pre,
	};
};

module.exports.AuthContextConsumer = client.AuthContextConsumer;
module.exports.AuthContextProvider = client.AuthContextProvider;
module.exports.useAuth = client.useAuth;
