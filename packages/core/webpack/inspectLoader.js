/* eslint-disable no-console, no-underscore-dangle */
const debug = require('debug');

const d = debug('inspectLoader');

function log(name, resource) {
	d(`[${name}] ${resource}`);
}

function inspectLoader(loaderName) {
	return {
		loader: 'inspect-loader',
		options: {
			loaderName,
			callback(inspect) {
				log(inspect.options.loaderName, inspect.context._module.resource);
			},
		},
	};
}

module.exports = {
	log,
	default: inspectLoader,
};
