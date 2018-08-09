const path = require('path');

const projectData = 'src/imperium';

module.exports = {
	production: {
		buildDir: 'build',
		minimize: true,
		reportFilename: 'report.html',
	},
	project: {
		Connectors: path.join(projectData, 'Connectors.js'),
		serverModules: path.join(projectData, 'serverModules.js'),
		clientModules: path.join(projectData, 'clientModules.js'),
		routeDefaults: path.join(projectData, 'routeDefaults.js'),
	},
	client: {
		// This object is available on the client as window.__INITIAL_CONF__
		initialConfig: {
			graphql: `${process.env.GRAPHQL_HOST}/api/graphql`,
			jwt_localstorage_name: process.env.JWT_LOCALSTORAGE_NAME,
		},
	},
};
