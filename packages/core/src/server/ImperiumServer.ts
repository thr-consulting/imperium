/* eslint-disable no-console */
import express, {NextFunction, Response, Application} from 'express';
import debug from 'debug';
import chalk from 'chalk';
import isFunction from 'lodash/isFunction';
import {
	ImperiumConnectorsMap,
	ImperiumRequest,
	ImperiumServerModule,
	ImperiumServerOptions,
	MiddlewareMap,
} from '../../types';
import Context from './Context';
import defaultOptions from './defaultOptions';

const d = debug('imperium.core.ImperiumServer');

export default class ImperiumServer {
	_connectors: ImperiumConnectorsMap;
	_serverModules: ImperiumServerModule[];
	_options: {[key: string]: any};
	_app: Application | null;
	_middleware: MiddlewareMap;

	constructor(options: ImperiumServerOptions) {
		this._connectors = options.connectors;
		this._serverModules = [];
		this._middleware = {};
		this._app = null;

		// Loading server definitions
		if (options.serverModules) {
			// Load module definitions
			this._serverModules = options.serverModules.map(moduleFunc => {
				const moduleDefinition = moduleFunc();
				d(`Loading server module: ${moduleDefinition.name || 'unnamed module'}`);
				return moduleDefinition;
			});
		}

		// Load Imperium global options
		this._options = this._serverModules.reduce((memo, module) => {
			if (module.options && isFunction(module.options)) {
				return {
					...memo,
					...module.options(),
				};
			}
			return memo;
		}, Object.assign({}, defaultOptions, options.options ? options.options() : {}));
	}

	async start() {
		if (this._app) throw new Error('Server already started');

		d('Creating connectors');
		await this._connectors.create();

		d('Starting express app');
		// Create express app
		this._app = express();

		// Module middleware
		d('Creating module middleware');
		this._middleware = this._serverModules.reduce(
			(memo, module) => {
				if (module.middleware && isFunction(module.middleware)) {
					return {
						...memo,
						...module.middleware(this),
					};
				}
				return memo;
			},
			{
				contextMiddleware: () => {
					return (req: ImperiumRequest, res: Response, next: NextFunction) => {
						d('Creating context');
						const context = new Context(this._connectors, this._options);
						this._serverModules.forEach(module => {
							if (module.models && isFunction(module.models)) context.addModels(module.models);
						});
						// Add the context object to the req
						req.context = context;
						next();
					};
				},
			},
		);

		// Module endpoints
		d('Creating module endpoints');
		this._serverModules.forEach(module => {
			if (module.endpoints && isFunction(module.endpoints)) module.endpoints(this);
		});

		// Create server startup Context
		d('Creating initial context');
		const context = new Context(this._connectors, this._options);
		this._serverModules.forEach(module => {
			if (module.models && isFunction(module.models)) context.addModels(module.models);
		});

		// Create startup promises (these are executed in the next section)
		const startupPromises = this._serverModules.reduce(
			(memo, module) => {
				if (module.startup && isFunction(module.startup)) {
					const moduleStartupReturn = module.startup(this);
					if (moduleStartupReturn && isFunction(moduleStartupReturn.then)) {
						// Add a catch function to the promise
						moduleStartupReturn.catch(err => {
							console.log(chalk.bold.white('#######################################################'));
							console.log(chalk.bold.red(' >>> Error running module startup\n'));
							console.error(err);
							console.log(chalk.bold.white('#######################################################'));
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

		this._app.listen(this._options.port, () => {
			// d(this._options);
		});

		return this;
	}

	async stop() {
		d('Closing connectors');
		this._connectors.close();
	}

	get connectors() {
		return this._connectors;
	}

	get modules() {
		return this._serverModules;
	}

	get options() {
		return this._options;
	}

	get app() {
		if (this._app) return this._app;
		throw new Error('Express app not created');
	}

	get middleware() {
		return this._middleware;
	}
}
