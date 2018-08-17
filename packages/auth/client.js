const authReducer = require('./lib/client/data/redux');

module.exports = function() {
	return {
		reducers: {
			auth: authReducer,
		},
	};
};
