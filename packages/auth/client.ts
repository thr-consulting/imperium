const client = require('./lib/client');
const startup = require('./lib/client').startup;

module.exports = {
	AuthContextConsumer: client.AuthContextConsumer,
	AuthContextProvider: client.AuthContextProvider,
	default() {
		return {
			routes: client.routes,
			startup,
		};
	},
};
