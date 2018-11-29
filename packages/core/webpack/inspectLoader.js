/* eslint-disable no-console, no-underscore-dangle */
/*
 * With the DEBUG environment variable "inspectLoader" set this file will log all Babel and other Webpack loaders.
 */
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
