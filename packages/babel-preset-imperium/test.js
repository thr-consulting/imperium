/* eslint-disable func-names,@typescript-eslint/no-var-requires */
const create = require('./create');

module.exports = function (api, opts) {
	return create(api, opts, 'test');
};
