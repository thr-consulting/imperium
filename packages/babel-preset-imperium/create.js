/* eslint-disable no-param-reassign, func-names, global-require, no-var, vars-on-top, prefer-template, operator-linebreak */

const validateBoolOption = (name, value, defaultValue) => {
	if (typeof value === 'undefined') {
		value = defaultValue;
	}
	if (typeof value !== 'boolean') {
		throw new Error(`Preset imperium: '${name}' option must be a boolean.`);
	}
	return value;
};

module.exports = function(api, opts, env) {
	if (!opts) {
		opts = {};
	}

	// Environment
	var isEnvDevelopment = env === 'development';
	var isEnvProduction = env === 'production';
	var isEnvTest = env === 'test';

	// Options
	var isDebug = validateBoolOption('debug', opts.debug, false);
	var isClient = validateBoolOption('client', opts.client, false);
	var forceModules = validateBoolOption('forceModules', opts.forceModules, false);
	var forceReact = validateBoolOption('react', opts.react, false);

	if (!isEnvDevelopment && !isEnvProduction && !isEnvTest) {
		throw new Error(
			'Using `@imperium/babel-preset-imperium` requires that you specify `NODE_ENV` or ' +
			'`BABEL_ENV` environment variables. Valid values are "development", ' +
			'"test", and "production". Instead, received: ' +
			JSON.stringify(env) +
			'.'
		);
	}

	return {
		presets: [
			!isClient && [
				// ES features necessary for user's Node version
				require('@babel/preset-env').default,
				{
					debug: isDebug,
					targets: {
						node: 'current',
					},
					modules: (forceModules || isEnvDevelopment || isEnvTest) ? 'commonjs' : false,
				},
			],
			isClient && [
				// Latest stable ECMAScript features
				require('@babel/preset-env').default,
				{
					debug: isDebug,
					targets: {
						browsers: ['last 2 versions', '> 1%'],
					},
					useBuiltIns: false,
					// Do not transform modules to CJS
					modules: false,
					exclude: ['transform-typeof-symbol'],
				},
			],
			(isClient || forceReact) && [
				require('@babel/preset-react').default,
				{
					// Adds component stack to warning messages
					// Adds __self attribute to JSX which React will use for some warnings
					development: isEnvDevelopment || isEnvTest,
					// Will use the native built-in instead of trying to polyfill
					// behavior for any plugins that require one.
					useBuiltIns: true,
				},
			],
			// Add flow parsing
			[require('@babel/preset-flow').default],
		].filter(Boolean),
		plugins: [
			// Experimental macros support. Will be documented after it's had some time
			// in the wild.
			require('babel-plugin-macros'),

			// Necessary to include regardless of the environment because
			// in practice some other transforms (such as object-rest-spread)
			// don't work without it: https://github.com/babel/babel/issues/7215
			require('@babel/plugin-transform-destructuring').default,

			// class { handleClick = () => { } }
			// Enable loose mode to use assignment instead of defineProperty
			// See discussion in https://github.com/facebook/create-react-app/issues/4263
			[
				require('@babel/plugin-proposal-class-properties').default,
				{
					loose: true,
				},
			],

			// The following two plugins use Object.assign directly, instead of Babel's
			// extends helper. Note that this assumes `Object.assign` is available.
			// { ...todx, completed: true }
			[
				require('@babel/plugin-proposal-object-rest-spread').default,
				{
					useBuiltIns: true,
				},
			],

			// Polyfills the runtime needed for async/await and generators
			[
				require('@babel/plugin-transform-runtime').default,
				{
					corejs: false,
					regenerator: true,
					useESModules: false,
				},
			],

			isEnvProduction && isClient && [
				// Remove PropTypes from production build
				require('babel-plugin-transform-react-remove-prop-types').default,
				{
					removeImport: true,
				},
			],

			// function* () { yield 42; yield 43; }
			// !isEnvTest && [
			// 	require('@babel/plugin-transform-regenerator').default,
			// 	{
			// 		// Async functions are converted to generators by @babel/preset-env
			// 		async: false,
			// 	},
			// ],

			// Adds syntax support for import()
			require('@babel/plugin-syntax-dynamic-import').default,

			// Transform dynamic import to require
			isEnvTest && require('babel-plugin-transform-dynamic-import').default,

			// Add react proptypes from flow types
			isEnvDevelopment && isClient && require('babel-plugin-flow-react-proptypes').default,

			// Inline import graphqls files
			!isClient && [
				require('babel-plugin-inline-import').default,
				{
					extensions: ['.graphqls'],
				},
			],
		].filter(Boolean),
	};
};
