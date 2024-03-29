import {env} from '@thx/env';
import debug from 'debug';
import {isFunction, sortBy, isArray, flowRight} from 'lodash-es';
import type {ReactNode} from 'react';
import {render} from 'react-dom';
import type {RootProps} from './Root';
import {Root} from './Root';
import type {HocCreator, ImperiumClientConfig, ImperiumClientModule} from './types';
import {withClient} from './withClient';

const d = debug('imperium.client.ImperiumClient');

export class ImperiumClient {
	private readonly _moduleFactoryFn: () => ImperiumClientModule[];
	private _modules: ImperiumClientModule[];
	private readonly render: (props: RootProps) => ReactNode;

	constructor(config: ImperiumClientConfig) {
		this._moduleFactoryFn = config.clientModules;
		this._modules = [];
		this.render = config.render;
	}

	public async start(): Promise<this> {
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
		const hoc = flowRight(hocCreators.map(v => v(this)));
		const RootWrappedComponent = hoc(Root);

		d('Rendering root component');
		render(<RootWrappedComponent render={this.render} imperiumClient={this} />, document.getElementById('root'));

		if (env.isDevelopment()) {
			window.__IMPERIUM_CLIENT__ = this; // eslint-disable-line no-underscore-dangle
		}
		return this;
	}

	public get modules(): ImperiumClientModule[] {
		return this._modules;
	}
}
