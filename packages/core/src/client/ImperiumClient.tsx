import React from 'react';
import {render} from 'react-dom';
import debug from 'debug';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import flowRight from 'lodash/flowRight';
import Root from './Root';
import {HocCreator, ImperiumClientModule, ImperiumClientOptions, ImperiumRoute, RootProps} from '../../types';

const d = debug('imperium.core.client');

export default class ImperiumClient {
	_clientModules: ImperiumClientModule[];
	_initialConf: {[key: string]: any};
	_initialState: {[key: string]: any};
	_rootComponent: React.Component;
	_defaultRootProps: {[key: string]: any};
	_rootProps: {[key: string]: any};

	constructor(options: ImperiumClientOptions) {
		// @ts-ignore
		this._initialConf = window.__INITIAL_CONF__; // eslint-disable-line no-underscore-dangle
		this._initialState = {};
		this._clientModules = [];
		this._rootComponent = options.rootComponent;
		this._defaultRootProps = options.rootProps || {};
		this._rootProps = {};

		// Loading client module definitions
		const clientModuleNames: string[] = [];
		if (options.clientModules) {
			// Load module definitions
			this._clientModules = options.clientModules.map(moduleFunc => {
				const moduleDefinition = moduleFunc();
				clientModuleNames.push(moduleDefinition.name || 'unnamed module');
				return moduleDefinition;
			});
		}
		d(`Loaded modules: ${clientModuleNames.join(', ')}`);
	}

	async start() {
		// if (this._initialState) throw new Error('Client already started');
		d('Starting ImperiumClient...');

		// Build initial state
		d('Building initial state');
		this._initialState = await this._clientModules.reduce(async (memo, module) => {
			const state = await memo;
			if (module.initialState && isFunction(module.initialState)) {
				const moreState = await module.initialState(this._initialConf, state);
				if (moreState) {
					return {
						...state,
						...moreState,
					};
				}
				return state;
			}
			return state;
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
		d('Loading routes');
		const routes = clientModules.reduce(
			(memo, module): ImperiumRoute[] => {
				if (module.routes && isArray(module.routes)) return [...memo, ...module.routes];
				return memo;
			},
			[] as ImperiumRoute[],
		);

		// HOC's
		d("Building HoC's");
		const hocCreators = clientModules.reduce(
			(memo, module) => {
				if (module.hocs && isArray(module.hocs)) return [...memo, ...module.hocs];
				return memo;
			},
			[] as HocCreator[],
		);

		// Execute HoC creators and compose HoC's.
		const hoc = flowRight(hocCreators.map(v => v(this)));

		d('Rendering root component');
		render(
			<Root hoc={hoc} rootProps={this._rootProps} rootComponent={rootComponent} routes={routes} />,
			document.getElementById('root'),
		);
	}

	get initialState() {
		return this._initialState;
	}

	get initialConf() {
		return this._initialConf;
	}
}
