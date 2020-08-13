/* eslint-disable global-require,@typescript-eslint/no-var-requires,import/no-dynamic-require */
const mergeOptions = require('merge-options');
const {log} = require('@thx/common-webpack');
const path = require('path');
const fs = require('fs');
const isFunction = require('lodash/isFunction');
const d = require('debug')('imperium.dev.getConfig');

module.exports = function getConfig() {
	// The project can define their own config file
	const projectImperiumConfigFile = process.argv.slice(2)[0] || null;

	// Read the configuration, extending the default one
	const config = mergeOptions(
		require('../defaultConfig'),
		projectImperiumConfigFile ? require(path.resolve(process.cwd(), projectImperiumConfigFile)) : {},
	);

	// TODO check validation of options that have been imported

	// Config Modules definition, initially an empty array
	const configModulePath = path.resolve(config.source.path, config.source.configModules);
	let configModuleFunctions = [];

	// Config modules definition file isn't required to exist
	if (fs.existsSync(configModulePath)) {
		// We load the configModules file here and that may be written in TS,
		// so we run it through babel/register, but ONLY the config file.
		require('@babel/register')({
			presets: [['@imperium/babel-preset-imperium', {client: false, typescript: true, forceModules: true}]],
			extensions: ['.js', '.ts', '.tsx'],
			only: [
				filepath => {
					if (filepath === configModulePath) {
						log('BABEL/REG-CONFIG', filepath);
						return true;
					}
					return false;
				},
			],
		});
		configModuleFunctions = require(configModulePath).default;
	}

	// Run configModule functions
	const configModuleNames = [];
	const configModules = configModuleFunctions.map(configModuleFunction => {
		if (!isFunction(configModuleFunction)) {
			throw new Error('');
		}
		const configModuleDefinition = configModuleFunction(config);
		configModuleNames.push(configModuleDefinition.name || 'unnamed module');
		return configModuleDefinition;
	});
	d(`Loaded config modules: ${configModuleNames.join(', ')}`);

	// Merge initialConfig options
	config.html.templateParameters = {
		...config.html.templateParameters,
		initialConfig: JSON.stringify(
			mergeOptions(
				config.html.templateParameters.initialConfig,
				configModules.reduce((memo, configModule) => {
					if (configModule.initialConfig) {
						return Object.assign(memo, configModule.initialConfig);
					}
					return memo;
				}, {}),
			),
		),
	};

	// Merge webpack client rules
	config.webpack.client.rules = config.webpack.client.rules.concat(
		configModules.reduce((memo, configModule) => {
			if (configModule.webpack && configModule.webpack.client && configModule.webpack.client.rules) {
				return memo.concat(configModule.webpack.client.rules);
			}
			return memo;
		}, []),
	);

	// Merge webpack server rules
	config.webpack.server.rules = config.webpack.server.rules.concat(
		configModules.reduce((memo, configModule) => {
			if (configModule.webpack && configModule.webpack.server && configModule.webpack.server.rules) {
				return memo.concat(configModule.webpack.server.rules);
			}
			return memo;
		}, []),
	);

	return config;
};
