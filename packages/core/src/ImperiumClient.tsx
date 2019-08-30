import React from 'react';
import {render} from 'react-dom';
import debug from 'debug';
import Root from './client/components/Root';

const d = debug('imperium.core.client');

export interface ImperiumClientModule {
	name: string;
}

type ImperiumClientModuleFunction = () => ImperiumClientModule;

export interface ImperiumClientOptions {
	clientModules: ImperiumClientModuleFunction[];
}

export default class ImperiumClient {
	_clientModules: ImperiumClientModule[];

	constructor(options: ImperiumClientOptions) {
		this._clientModules = options.clientModules.map(moduleFunc => {
			const moduleDefinition = moduleFunc();
			d(`Loading client module: ${moduleDefinition.name || 'unnamed module'}`);
			return moduleDefinition;
		});
	}

	start() {
		render(<Root />, document.getElementById('root'));
	}
}
