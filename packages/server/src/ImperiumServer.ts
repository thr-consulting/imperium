/* eslint-disable no-console */
import express, {NextFunction, Response, Application} from 'express';
import {createServer, Server} from 'http';
import debug from 'debug';
import chalk from 'chalk';
import isFunction from 'lodash/isFunction';
import {ContextManager} from './ContextManager';
import defaultEnvironment from './defaultEnvironment';
import {
	ImperiumConnectors,
	ImperiumConnectorsMap,
	ImperiumRequest,
	ImperiumServerModule,
	MiddlewareMap,
	ImperiumServerModuleFunction,
	ImperiumEnvironment,
	IImperiumServer,
} from './types';

const d = debug('imperium.server.ImperiumServer');
const dd = debug('verbose.imperium.server.ImperiumServer');

export interface ImperiumServerConfig {
	connectors: ImperiumConnectors;
	serverModules?: ImperiumServerModuleFunction[];
	environment?: ImperiumEnvironment;
}

/**
 * ImperiumServer
 */
export default class ImperiumServer implements IImperiumServer {
	private _connectors: ImperiumConnectors;
	private _connectorsMap: ImperiumConnectorsMap;
	private readonly _serverModules: ImperiumServerModule[];
	private readonly _environment: ImperiumEnvironment;
	private _expressApp: Application | null;
	private _httpServer: Server | null;
	private _middleware: MiddlewareMap;
	private _context: ContextManager | null;

	constructor(config: ImperiumServerConfig) {
		this._connectors = config.connectors;
		this._connectorsMap = {};
		this._serverModules = [];
		this._middleware = {};
		this._expressApp = null;
		this._httpServer = null;
		this._context = null;

		// Loading server module definitions
		const serverModuleNames: string[] = [];
		if (config.serverModules) {
			// Load module definitions
			this._serverModules = config.serverModules.map(moduleFunc => {
				const moduleDefinition = moduleFunc();
				serverModuleNames.push(moduleDefinition.name || 'unnamed module');
				return moduleDefinition;
			});
		}
		d(`Loaded modules: ${serverModuleNames.join(', ')}`);

		// Load Imperium environment
		d('Loading environment');
		this._environment = this._serverModules.reduce(
			(memo, module) => {
				if (module.environment && isFunction(module.environment)) {
					return {
						...memo,
						...module.environment(),
					};
				}
				return memo;
			},
			{...defaultEnvironment, ...(config.environment || {})},
		);
	}

	async start() {
		if (this._expressApp) throw new Error('Server already started');

		d('Creating connectors');
		this._connectorsMap = await this._connectors.create(this);

		d('Creating express app');
		this._expressApp = express();

		d('Creating HTTP server');
		this._httpServer = createServer(this._expressApp);

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
				contextManagerMiddleware: () => {
					return (req: ImperiumRequest, res: Response, next: NextFunction) => {
						dd(`Creating context manager for request to: ${req.baseUrl}`);
						const contextManager = new ContextManager(this);
						this._serverModules.forEach(module => {
							if (module.context && isFunction(module.context)) contextManager.addContext(module.context);
						});
						// Add the context object to the req
						req.contextManager = contextManager;
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
		this._context = new ContextManager(this);
		this._serverModules.forEach(module => {
			if (module.context && isFunction(module.context) && this._context) this._context.addContext(module.context);
		});

		// Create startup promises (these are executed in the next section)
		const startupPromises = this._serverModules.reduce((memo, module) => {
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
		}, [] as Promise<any | void>[]);

		// Execute startup promises
		d('Executing module startup');
		Promise.all(startupPromises).catch(err => {
			d(`Module startup problem: ${err}`);
			throw err;
		});

		d('Starting server');
		this._httpServer.listen(this._environment.port, () => {
			d(`Now listening on port: ${this._environment.port}`);
		});

		return this;
	}

	async stop() {
		d('Closing connectors');
		await this._connectors.close();
	}

	get connectors() {
		return this._connectorsMap;
	}

	get modules() {
		return this._serverModules;
	}

	get environment() {
		return this._environment;
	}

	addEnvironment(key: string, value: ImperiumEnvironment) {
		this._environment[key] = value;
	}

	get expressApp(): Application {
		if (this._expressApp) return this._expressApp;
		throw new Error('Imperium server not started yet.');
	}

	get httpServer(): Server {
		if (this._httpServer) return this._httpServer;
		throw new Error('Imperium server not started yet.');
	}

	get middleware() {
		return this._middleware;
	}

	get initialContextManager() {
		if (this._context) return this._context;
		throw new Error('Imperium server not started yet.');
	}
}
