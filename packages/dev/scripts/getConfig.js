/* eslint-disable global-require,@typescript-eslint/no-var-requires,import/no-dynamic-require */
const mergeOptions = require('merge-options');
const path = require('path');
const fs = require('fs');
const d = require('debug')('imperium.dev.getConfig');
const isFunction = require('lodash/isFunction');

module.exports = function getConfig() {
	// The project can define their own config file
	const projectImperiumConfigFile = process.argv.slice(2)[0] || null;

	// Read the configuration, extending the default one
	const config = mergeOptions(
		require('../defaultConfig'),
		projectImperiumConfigFile
			? require(path.resolve(process.cwd(), projectImperiumConfigFile))
			: {},
	);

	// TODO check validation of options that have been imported

	// Config Modules definition, initially an empty array
	const configModulePath = path.resolve(
		config.source.path,
		config.source.configModules,
	);
	let configModuleFunctions = [];

	// Config modules definition file isn't required to exist
	if (fs.existsSync(configModulePath)) {
		// We load the configModules file here and that may be written in TS,
		// so we run it through babel/register.
		require('@babel/register')({
			presets: [
				['@imperium/babel-preset-imperium', {client: false, typescript: true}],
			],
			extensions: ['.js', '.ts'],
		});
		configModuleFunctions = require(configModulePath).default;
	}

	// Run configModule functions
	const configModules = configModuleFunctions.map(configModuleFunction => {
		if (!isFunction(configModuleFunction)) {
			throw new Error('');
		}
		const configModuleDefinition = configModuleFunction(config);
		d(
			`Loading config module: ${configModuleDefinition.name ||
				'unnamed module'}`,
		);
		return configModuleDefinition;
	});

	config.web.options.initialConfig = mergeOptions(
		config.web.options.initialConfig,
		configModules.reduce((memo, configModule) => {
			if (configModule.initialConfig) {
				return Object.assign(memo, configModule.initialConfig);
			}
			return memo;
		}, {}),
	);

	return config;
};
