const client = require('./lib/client').default;

module.exports = function() {
	return {
		startup: client.startup,
	};
};
