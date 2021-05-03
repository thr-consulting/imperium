import React from 'react';
import {render} from 'react-dom';
import debug from 'debug';
import isFunction from 'lodash/isFunction';
import {Environment} from '@thx/env';
import isArray from 'lodash/isArray';
import flowRight from 'lodash/flowRight';
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
	private readonly _moduleFactoryFn: () => ImperiumClientModule[];
	private _modules: ImperiumClientModule[];
	private render: (props: RootProps) => React.ReactNode;

	constructor(config: ImperiumClientConfig) {
		this._moduleFactoryFn = config.clientModules
		// eslint-disable-next-line no-underscore-dangle
		Environment.addDefaults(window.__IMPERIUM_SYS__);
		// eslint-disable-next-line no-underscore-dangle
		Environment.addEnvironment(window.__IMPERIUM_ENV__ as Record<string, string | undefined>);
		this._modules = [];
		this.render = config.render;
	}

	public async start(): Promise<this> {
		d('Starting ImperiumClient...');

		this._modules = this._moduleFactoryFn();
		d(`Loaded modules: ${this._modules.map(module => module.name).join(', ')}`);

		this._modules.forEach(module => {
			if (module.environmentDefaults) {
				Environment.addDefaults(module.environmentDefaults);
			}
		});

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

		if (Environment.getBool('development')) {
			window.__IMPERIUM_CLIENT__ = this; // eslint-disable-line no-underscore-dangle
		}
		return this;
	}

	public get modules(): ImperiumClientModule[] {
		return this._modules;
	}
}
