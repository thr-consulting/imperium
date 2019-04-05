const path = require('path'); // eslint-disable-line

/**
 * This is where the configuration resides in the host project.
 * It is a relative folder from the host project root.
 * @type {string}
 */
const projectData = 'src/imperium';

/**
 * These configuration values tells the Imperium framework how the host project is configured.
 */
module.exports = {
	production: {
		// Where the production host project is built, relative to host project root.
		buildDir: 'build',
		// Should Imperium minimize the host project when built
		minimize: true,
		// Where the webpack report is generated.
		reportFilename: 'report.html',
	},
	project: {
		// The path of the file where the data connectors are defined
		Connectors: path.join(projectData, 'Connectors.js'),
		// The path of the file where the server modules are defined. See (docs/ServerModule.md)
		serverModules: path.join(projectData, 'serverModules.js'),
		// The path of the file where the client modules are defined. See (docs/ClientModule.md)
		clientModules: path.join(projectData, 'clientModules.js'),
		// The path of the file where the default route options are configured.
		routeDefaults: path.join(projectData, 'routeDefaults.js'),
		// The path of the file where the root component is rendered from
		rootRender: path.join(projectData, 'rootRender.js'),
		// The path of the file where options are found for HTML index generation (optional)
		htmlOptions: path.join(projectData, 'htmlOptions.js'),
	},
};
