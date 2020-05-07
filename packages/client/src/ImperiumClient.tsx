import React from 'react';
import {render} from 'react-dom';
import debug from 'debug';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import flowRight from 'lodash/flowRight';
import Root from './Root';
import {ClientContext} from './ClientContext';
import type {
	GlobalConst,
	Hoc,
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
	render: (props?: any) => React.ReactNode;
}

function withClient(client: IImperiumClient): Hoc {
	return function clientHoc(WrappedComponent: React.ComponentType) {
		const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';
		function ComponentWithClient(props: any) {
			return (
				<ClientContext.Provider value={client}>
					<WrappedComponent {...props} />
				</ClientContext.Provider>
			);
		}
		ComponentWithClient.displayName = `withClient(${displayName}`;
		return ComponentWithClient;
	};
}

export default class ImperiumClient implements IImperiumClient {
	private readonly _clientModules: ImperiumClientModule[];
	private readonly _globalConst: GlobalConst;
	private _environment: ImperiumEnvironment;
	private _rootProps: RootProps;
	private readonly _renderProp: (props: RootProps) => React.ReactNode;

	constructor(config: ImperiumClientConfig) {
		// @ts-ignore
		this._globalConst = window.__INITIAL_CONF__; // eslint-disable-line no-underscore-dangle
		this._environment = {};
		this._clientModules = [];
		this._rootProps = {};
		this._renderProp = config.render;

		// Loading client module definitions
		const clientModuleNames: string[] = [];
		if (config.clientModules) {
			// Load module definitions
			this._clientModules = config.clientModules.map((moduleFunc) => {
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
		}, {});

		// HOC's
		d("Building HoC's");
		const hocCreators = this._clientModules.reduce(
			(memo, module) => {
				if (module.hocs && isArray(module.hocs)) return [...memo, ...module.hocs];
				return memo;
			},
			[withClient] as HocCreator[],
		);

		// Execute HoC creators and compose HoC's.
		const hoc = flowRight(hocCreators.map((v) => v(this)));
		const RootWrappedComponent = hoc(Root);

		d('Rendering root component');
		render(<RootWrappedComponent render={this._renderProp} imperiumClient={this} {...this._rootProps} />, document.getElementById('root'));
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
