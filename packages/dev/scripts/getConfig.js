const mergeOptions = require('merge-options');
const path = require('path');

module.exports = function getConfig() {
	// The project can define their own config file
	const projectImperiumConfigFile = process.argv.slice(2)[0] || null;

	// Read the configuration, extending the default one
	return mergeOptions(
		require('../defaultConfig'),
		projectImperiumConfigFile ? require(path.resolve(process.cwd(), projectImperiumConfigFile)) : {}
	);

	// TODO check to make sure paths are root, not relative
};
