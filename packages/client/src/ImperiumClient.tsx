import React from 'react';
import {render} from 'react-dom';
import debug from 'debug';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import flowRight from 'lodash/flowRight';
import mergeOptions from 'merge-options';
import Root, {RootProps} from './Root';
import {ClientContext} from './ClientContext';
import type {Hoc, HocCreator, ImperiumClientConfig, ImperiumClientModule} from './types';

const d = debug('imperium.client');

// HoC that injects Imperium client as a prop
function withClient(client: ImperiumClient): Hoc {
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

export class ImperiumClient {
	private readonly _environment: Record<string, unknown>;
	private readonly _moduleFactoryFn: () => ImperiumClientModule[];
	private _modules: ImperiumClientModule[];
	private render: (props: RootProps) => React.ReactNode;

	constructor(config: ImperiumClientConfig) {
		this._moduleFactoryFn = config.clientModules;
		// eslint-disable-next-line no-underscore-dangle
		this._environment = mergeOptions(window.__IMPERIUM_ENV__, window.__IMPERIUM_SYS__);
		this._modules = [];
		this.render = config.render;
	}

	public async start(): Promise<this> {
		d('Starting ImperiumClient...');

		this._modules = this._moduleFactoryFn();
		d(`Loaded modules: ${this._modules.map(module => module.name).join(', ')}`);

		const startupPromises = this._modules.reduce((memo, module) => {
			if (module.startup && isFunction(module.startup)) {
				return [...memo, module.startup(this)];
			}
			return memo;
		}, [] as Promise<void>[]);

		d('Executing module startup');
		await Promise.all(startupPromises).catch(err => {
			d(`Module startup problem: ${err}`);
			throw err;
		});

		// HOC's
		d("Building root HoC's");
		const hocCreators = this._modules.reduce(
			(memo, module) => {
				if (module.hocs && isArray(module.hocs)) return [...memo, ...module.hocs];
				return memo;
			},
			[withClient] as HocCreator[],
		);

		// Execute HoC creators and compose HoC's.
		const hoc = flowRight(hocCreators.map(v => v(this)));
		const RootWrappedComponent = hoc(Root);

		d('Rendering root component');
		render(<RootWrappedComponent render={this.render} imperiumClient={this} />, document.getElementById('root'));

		// TODO only in dev mode
		window.__IMPERIUM_CLIENT__ = this; // eslint-disable-line no-underscore-dangle
		return this;
	}

	public get modules(): ImperiumClientModule[] {
		return this._modules;
	}

	public get environment(): Record<string, unknown> {
		return this._environment;
	}
}

/*
export default class xImperiumClient implements IImperiumClient {
	private readonly _clientModules: ImperiumClientModule[];
	private readonly _globalConst: GlobalConst;
	private _environment: ImperiumEnvironment;
	private _rootProps: RootProps;
	private readonly _renderProp: (props: RootProps) => React.ReactNode;

	constructor(config: ImperiumClientConfig) {
		this._globalConst = mergeOptions(
			// @ts-ignore
			window.__INITIAL_CONF__, // eslint-disable-line no-underscore-dangle
			// @ts-ignore
			window.__IMPERIUM_ENV__, // eslint-disable-line no-underscore-dangle
		);
		this._environment = {};
		this._clientModules = [];
		this._rootProps = {};
		this._renderProp = config.render;

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

		// @ts-ignore
		window.__IMPERIUM_CLIENT__ = this; // eslint-disable-line no-underscore-dangle
	}

	async start(): Promise<void> {
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
		const hoc = flowRight(hocCreators.map(v => v(this)));
		const RootWrappedComponent = hoc(Root);

		d('Rendering root component');
		render(<RootWrappedComponent render={this._renderProp} imperiumClient={this} {...this._rootProps} />, document.getElementById('root'));
	}

	get modules(): ImperiumClientModule[] {
		return this._clientModules;
	}

	get environment(): ImperiumEnvironment {
		return this._environment;
	}

	get globalConst(): GlobalConst {
		return this._globalConst;
	}
}
*/
