import express from 'express';
import debug from 'debug';
import isFunction from 'lodash/isFunction';
import {
	ImperiumConnectors,
	ImperiumServerModule,
	ImperiumServerModuleFunction,
} from './serverTypes';
import contextMiddleware from './server/contextMiddleware';
import Context from './server/Context';

const d = debug('imperium.core.server');

interface ImperiumServerOptions {
	connectors: ImperiumConnectors;
	serverModules: ImperiumServerModuleFunction[];
}

export default class ImperiumServer {
	_connectors: ImperiumConnectors;
	_serverModules: ImperiumServerModule[];

	constructor(options: ImperiumServerOptions) {
		this._connectors = options.connectors;

		// Load module definitions
		this._serverModules = options.serverModules.map(moduleFunc => {
			const moduleDefinition = moduleFunc();
			d(`Loading server module: ${moduleDefinition.name || 'unnamed module'}`);
			return moduleDefinition;
		});
	}

	async start() {
		d('Creating connectors');
		await this._connectors.create();

		d('Starting express app');
		// Create express app
		const app = express();

		// Module middleware
		d('Creating module middleware');
		const middlewares = this._serverModules.reduce(
			(memo, module) => {
				if (module.middleware && isFunction(module.middleware)) {
					return {
						...memo,
						...module.middleware(),
					};
				}
				return memo;
			},
			{
				contextMiddleware, // value is () => {} FOR NOW
			},
		);

		// Module endpoints
		d('Creating module endpoints');
		this._serverModules.forEach(module => {
			if (module.endpoints && isFunction(module.endpoints))
				module.endpoints({
					app,
					connectors: this._connectors,
					modules: this._serverModules,
					middlewares,
				});
		});

		// Create server startup Context
		d('Creating initial context');
		const context = new Context(this._connectors);
		this._serverModules.forEach(module => {
			if (module.models && isFunction(module.models))
				context.addModels(module.models);
		});

		app.listen(process.env.PORT || 4001, () => {
			// console.log(`  PID ${process.pid} listening on port ${process.env.PORT || 4000}`);
		});

		return this;
	}

	async stop() {
		d('Closing connectors');
		this._connectors.close();
	}
}
