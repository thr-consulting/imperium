/* eslint-disable no-console, no-underscore-dangle,@typescript-eslint/no-var-requires */
/*
 * With the DEBUG environment variable "inspectLoader" set this file will log all Babel and other Webpack loaders.
 */
import debug from 'debug';

const d = debug('inspectLoader');

export function log(name: string, resource: string) {
	d(`[${name}] ${resource}`);
}

interface Inspection {
	options: {
		loaderName: string;
	};
	context: {
		_module: {
			resource: string;
		};
	};
}

export default function inspectLoader(loaderName: string) {
	return {
		loader: 'inspect-loader',
		options: {
			loaderName,
			callback(inspect: Inspection) {
				log(inspect.options.loaderName, inspect.context._module.resource);
			},
		},
	};
}
