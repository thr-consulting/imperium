/* eslint-disable no-console, no-underscore-dangle */
const debug = require('debug');

const d = debug('imperium.webpack.inspectLoader');

function inspectLoader(loaderName) {
	return {
		loader: 'inspect-loader',
		options: {
			loaderName,
			callback(inspect) {
				d(`:: ${inspect.options.loaderName} > ${inspect.context._module.resource}`);
			},
		},
	};
}

module.exports = inspectLoader;
