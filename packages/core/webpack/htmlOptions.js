/* eslint-disable global-require, import/no-dynamic-require */
const path = require('path');
const isFunction = require('lodash/isFunction');

const isDevelopment = process.env.NODE_ENV === 'development';

function htmlOptions({iSrcDir, pRoot}, config) {
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
		jwt_localstorage_name: process.env.JWT_LOCALSTORAGE_NAME || 'IMP',
	});

	return {
		title: `${process.env.APPNAME}${isDevelopment ? ' - Development' : ''}`,
		meta: {
			'mobile-web-app-capable': 'yes',
		},
		template: path.join(iSrcDir, 'client', 'index.html'),
		templateOptions: {
			initialConfig: JSON.stringify(initialConfig),
		},
	};
}

module.exports = htmlOptions;
