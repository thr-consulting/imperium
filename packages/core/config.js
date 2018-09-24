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
		rootRender: path.join(projectData, 'rootRender.js'),
	},
};
