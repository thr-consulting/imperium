import {Map} from 'immutable';

module.exports = function() {
	return {
		reducers: {
			auth(state) {
				if (!state) return new Map({});
				return state;
			},
		},
	};
};
