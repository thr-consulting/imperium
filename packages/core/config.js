module.exports = {
	production: {
		buildDir: 'build',
		minimize: true,
		reportFilename: 'report.html',
	},
	project: {
		Connectors: 'src/imperium/Connectors.js',
		serverModules: 'src/imperium/serverModules.js',
	},
	client: {
		// This object is available on the client as window.__INITIAL_CONF__
		initialConfig: {
			graphql: `${process.env.GRAPHQL_HOST}/api/graphql`,
			jwt_localstorage_name: process.env.JWT_LOCALSTORAGE_NAME,
		},
	},
};
