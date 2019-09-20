/* eslint-disable no-console */
import express, {NextFunction, Response, Application} from 'express';
import {createServer, Server} from 'http';
import debug from 'debug';
import chalk from 'chalk';
import isFunction from 'lodash/isFunction';
import {
	ImperiumConnectors,
	ImperiumConnectorsMap,
	ImperiumRequest,
	ImperiumServerModule,
	ImperiumServerOptions,
	MiddlewareMap,
} from '../../types';
import Context from './Context';
import defaultOptions from './defaultOptions';

const d = debug('imperium.core.ImperiumServer');
const dd = debug('verbose.imperium.core.ImperiumServer');

export default class ImperiumServer {
	_connectors: ImperiumConnectors;
	_connectorsMap: ImperiumConnectorsMap;
	_serverModules: ImperiumServerModule[];
	_options: {[key: string]: any};
	_app: Application | null;
	_server: Server | null;
	_middleware: MiddlewareMap;
	_context: Context | null;

	constructor(options: ImperiumServerOptions) {
		this._connectors = options.connectors;
		this._connectorsMap = {};
		this._serverModules = [];
		this._middleware = {};
		this._app = null;
		this._server = null;
		this._context = null;

		// Loading server module definitions
		const serverModuleNames: string[] = [];
		if (options.serverModules) {
			// Load module definitions
			this._serverModules = options.serverModules.map(moduleFunc => {
				const moduleDefinition = moduleFunc();
				serverModuleNames.push(moduleDefinition.name || 'unnamed module');
				return moduleDefinition;
			});
		}
		d(`Loaded modules: ${serverModuleNames.join(', ')}`);

		// Load Imperium global options
		d('Loading options');
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
		this._connectorsMap = await this._connectors.create();

		d('Creating express app');
		this._app = express();

		d('Creating HTTP server');
		this._server = createServer(this._app);

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
						dd(`Creating context for request to: ${req.baseUrl}`);
						const context = new Context(this._connectorsMap, this._options);
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
		this._context = new Context(this._connectorsMap, this._options);
		this._serverModules.forEach(module => {
			if (module.models && isFunction(module.models)) this._context.addModels(module.models);
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

		d('Starting server');
		this._server.listen(this._options.port, () => {
			d(`Now listening on port: ${this._options.port}`);
		});

		return this;
	}

	async stop() {
		d('Closing connectors');
		this._connectors.close();
	}

	get connectors() {
		return this._connectorsMap;
	}

	get modules() {
		return this._serverModules;
	}

	get options() {
		return this._options;
	}

	addOption(option: any, value: any) {
		this._options[option] = value;
	}

	get app(): Application {
		if (this._app) return this._app;
		throw new Error('Imperium server not started yet.');
	}

	get server(): Server {
		if (this._server) return this._server;
		throw new Error('Imperium server not started yet.');
	}

	get middleware() {
		return this._middleware;
	}

	get initialContext() {
		if (this._context) return this._context;
		throw new Error('Imperium server not started yet.');
	}
}
