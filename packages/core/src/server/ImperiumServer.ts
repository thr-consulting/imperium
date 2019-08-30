/* eslint-disable no-console */
import express from 'express';
import debug from 'debug';
import chalk from 'chalk';
import isFunction from 'lodash/isFunction';
import {
	ImperiumConnectorsMap,
	ImperiumServerModule,
	ImperiumServerOptions,
} from '../../types';
import contextMiddleware from './contextMiddleware';
import Context from './Context';

const d = debug('imperium.core.server');

export default class ImperiumServer {
	_connectors: ImperiumConnectorsMap;
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

		// Create startup promises
		const startupPromises = this._serverModules.reduce(
			(memo, module) => {
				if (module.startup && isFunction(module.startup)) {
					const moduleStartupReturn = module.startup(context);
					if (moduleStartupReturn && isFunction(moduleStartupReturn.then)) {
						moduleStartupReturn.catch(err => {
							console.log(
								chalk.bold.white(
									'#######################################################',
								),
							);
							console.log(
								chalk.bold.red(' >>> Error running module startup\n'),
							);
							console.error(err);
							console.log(
								chalk.bold.white(
									'#######################################################',
								),
							);
							return Promise.reject(err);
						});
					}
					return [...memo, moduleStartupReturn];
				}
				return memo;
			},
			[] as Promise<any>[],
		);

		// Execute startup promises
		d('Executing module startup');
		Promise.all(startupPromises).catch(err => {
			d(`Module startup problem: ${err}`);
			throw err;
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
