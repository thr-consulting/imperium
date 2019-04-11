/* eslint-disable global-require, import/no-dynamic-require */
const path = require('path');
const isFunction = require('lodash/isFunction');
const isSourceFile = require('./isSourceFile');

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Provides options for the HtmlWebpackPlugin plugin.
 * @param iSrcDir
 * @param pRoot
 * @param config
 * @return *
 */
function htmlOptions({iSrcDir, pRoot, options}, config) {
	// When building production (during webpack), the project's config files will most likely be written in ES6.
	// Under dev mode, everything is already run through babel.
	if (!isDevelopment) {
		require('@babel/register')({
			presets: [['@imperium/babel-preset-imperium', {client: false, forceModules: true, typescript: true}]],
			only: [
				isSourceFile([
					path.resolve(pRoot, 'src'),
				], 'BABEL/REG'),
			],
		});
	}

	// We need to grab the initialConfig options from the server modules for inclusion in
	// the main index file that is generated.
	const serverModules = require(path.join(pRoot, config.project.serverModules)).default;
	const modules = serverModules.map(moduleFunc => moduleFunc());
	const initialConfig = modules.reduce((memo, module) => {
		if (module.initialConfig && isFunction(module.initialConfig)) {
			return {
				...memo,
				...module.initialConfig(),
			};
		}
		return memo;
	}, {
		jwt_localstorage_name: process.env.JWT_LOCALSTORAGE_NAME || 'IMP', // This initialConfig option is always present
	});

	return {
		title: options.title,
		meta: {
			'mobile-web-app-capable': 'yes',
		},
		template: path.join(iSrcDir, 'client', 'index.html'),
		templateOptions: {
			initialConfig: JSON.stringify(initialConfig),
			semanticUiLink: options.semanticUiLink,
		},
	};
}

module.exports = htmlOptions;
