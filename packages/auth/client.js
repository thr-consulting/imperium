const client = require('./lib/client/client');
const startup = require('./lib/client/client').startup;

module.exports = function() {
	return {
		routes: client.routes,
		startup,
	};
};
