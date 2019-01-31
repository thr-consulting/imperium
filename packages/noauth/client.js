const immutable = require('immutable');

module.exports = function() {
	return {
		reducers: {
			auth(state) {
				if (!state) return new immutable.Map({});
				return state;
			},
		},
	};
};
