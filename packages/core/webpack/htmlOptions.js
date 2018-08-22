const path = require('path');

const isDevelopment = process.env.NODE_ENV === 'development';

function htmlOptions(iSrcDir, config) {
	return {
		title: `${process.env.APPNAME}${isDevelopment ? ' - Development' : ''}`,
		meta: {
			'mobile-web-app-capable': 'yes',
		},
		template: path.join(iSrcDir, 'client', 'index.html'),
		templateOptions: {
			initialConfig: JSON.stringify(config.client.initialConfig),
		},
	};
}

module.exports = htmlOptions;
