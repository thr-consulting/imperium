import {env} from '@thx/env';
import debug from 'debug';
import {flowRight, isArray, isFunction, sortBy} from 'lodash-es';
import type {ComponentType, ReactNode} from 'react';
import type {HocCreator, ImperiumClientConfig, ImperiumClientModule} from './types';
import {withClient} from './withClient';

const d = debug('imperium.client.ImperiumClient');

export class ImperiumClient {
	private readonly _moduleFactoryFn: () => ImperiumClientModule[];
	private _modules: ImperiumClientModule[];
	private readonly rootComponent: (props?: any) => ReactNode;

	constructor(config: ImperiumClientConfig) {
		this._moduleFactoryFn = config.clientModules;
		this._modules = [];
		this.rootComponent = config.rootComponent;
	}

	public async start(): Promise<ComponentType> {
		d('Starting ImperiumClient...');

		this._modules = sortBy(this._moduleFactoryFn(), module => {
			return module.order || 9999;
		});
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
		const hocs = hocCreators.map(v => v(this));
		const hoc: (props?: any) => ComponentType = flowRight(hocs);

		if (env.isDevelopment()) {
			window.__IMPERIUM_CLIENT__ = this; // eslint-disable-line no-underscore-dangle
		}

		return hoc(this.rootComponent);
	}

	public get modules(): ImperiumClientModule[] {
		return this._modules;
	}
}
