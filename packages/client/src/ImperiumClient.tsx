import React from 'react';
import {render} from 'react-dom';
import debug from 'debug';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import flowRight from 'lodash/flowRight';
import Root from './Root';
import {
	GlobalConst,
	HocCreator,
	IImperiumClient,
	ImperiumClientModule,
	ImperiumClientModuleFunction,
	ImperiumEnvironment,
	RootProps,
} from './types';

const d = debug('imperium.client');

export interface ImperiumClientConfig {
	clientModules?: ImperiumClientModuleFunction[];
	rootComponent: React.Component;
	rootProps?: {[key: string]: any};
}

export default class ImperiumClient implements IImperiumClient {
	private _clientModules: ImperiumClientModule[];
	private _globalConst: GlobalConst;
	private _environment: ImperiumEnvironment;
	private _rootComponent: React.Component;
	private _defaultRootProps: RootProps;
	private _rootProps: RootProps;

	constructor(config: ImperiumClientConfig) {
		// @ts-ignore
		this._globalConst = window.__INITIAL_CONF__; // eslint-disable-line no-underscore-dangle
		this._environment = {};
		this._clientModules = [];
		this._rootComponent = config.rootComponent;
		this._defaultRootProps = config.rootProps || {};
		this._rootProps = {};

		// Loading client module definitions
		const clientModuleNames: string[] = [];
		if (config.clientModules) {
			// Load module definitions
			this._clientModules = config.clientModules.map(moduleFunc => {
				const moduleDefinition = moduleFunc();
				clientModuleNames.push(moduleDefinition.name || 'unnamed module');
				return moduleDefinition;
			});
		}
		d(`Loaded modules: ${clientModuleNames.join(', ')}`);
	}

	async start() {
		d('Starting ImperiumClient...');

		// Load environment
		d('Loading environment');
		this._environment = await this._clientModules.reduce(async (memo, module) => {
			const currentEnvironment = await memo;
			if (module.environment && isFunction(module.environment)) {
				const addedEnvironment = await module.environment(this._globalConst, currentEnvironment);
				if (addedEnvironment) {
					return {
						...currentEnvironment,
						...addedEnvironment,
					};
				}
				return currentEnvironment;
			}
			return currentEnvironment;
		}, Promise.resolve({}));

		// Run startup functions
		d('Running startup functions');
		this._rootProps = this._clientModules.reduce((memo, module): RootProps => {
			if (module.startup && isFunction(module.startup)) {
				return {
					...memo,
					...module.startup(this),
				};
			}
			return memo;
		}, this._defaultRootProps);

		this.renderRoot(this._clientModules, this._rootComponent);
	}

	renderRoot(clientModules: ImperiumClientModule[], rootComponent: React.Component) {
		// Load routes
		// d('Loading routes');
		// const routes = clientModules.reduce(
		// 	(memo, module): ImperiumRoute[] => {
		// 		if (module.routes && isArray(module.routes)) return [...memo, ...module.routes];
		// 		return memo;
		// 	},
		// 	[] as ImperiumRoute[],
		// );

		// HOC's
		d("Building HoC's");
		const hocCreators = clientModules.reduce((memo, module) => {
			if (module.hocs && isArray(module.hocs)) return [...memo, ...module.hocs];
			return memo;
		}, [] as HocCreator[]);

		// Execute HoC creators and compose HoC's.
		const hoc = flowRight(hocCreators.map(v => v(this)));

		d('Rendering root component');
		render(
			<Root hoc={hoc} rootProps={this._rootProps} rootComponent={rootComponent} />,
			document.getElementById('root'),
		);
	}

	get modules() {
		return this._clientModules;
	}

	get environment() {
		return this._environment;
	}

	get globalConst() {
		return this._globalConst;
	}
}
