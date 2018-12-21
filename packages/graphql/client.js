const startup = require('./lib/client/startup').default;

module.exports = function() {
	return {
		startup,
	};
};
