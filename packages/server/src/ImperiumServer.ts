/* eslint-disable no-console */
import express, {NextFunction, Response, Application, Request} from 'express';
import {createServer, Server} from 'http';
import debug from 'debug';
import chalk from 'chalk';
import isFunction from 'lodash/isFunction';
import {Connector} from './Connector';
import {ContextCreators, ContextManager} from './ContextManager';

const d = debug('imperium.server.ImperiumServer');
const dd = debug('verbose.imperium.server.ImperiumServer');

const defaultEnvironment: ImperiumEnvironment = {
	port: parseInt(process.env.SERVER_PORT || '4001', 10),
	nodeEnv: process.env.NODE_ENV || '',
	production: process.env.NODE_ENV === 'production' || process.env.NODE_ENV === undefined,
	development: process.env.NODE_ENV === 'development',
};

// basically a primitive recursive object.
export type ImperiumEnvironment<T = boolean | string | number | string[]> = {
	[key: string]: T | ImperiumEnvironment;
};

export interface ImperiumRequest<C> extends Request {
	contextManager: C;
}
export type ImperiumRequestHandler<C> = (req: ImperiumRequest<C>, res: Response, next: NextFunction) => void;

export interface MiddlewareMap<C> {
	[key: string]: () => ImperiumRequestHandler<C>;
}

export type ImperiumServerModule<Connectors extends Connector, Environment extends ImperiumEnvironment> = {
	name: string;
	environment?: () => Environment;
	middleware?: (server: ImperiumServer<Connectors, Environment>) => MiddlewareMap<any>;
	endpoints?: (server: ImperiumServer<Connectors, Environment>) => void;
	startup?: (server: ImperiumServer<Connectors, Environment>) => Promise<void>;
	context?: ContextCreators<Connectors>;
};

export interface ImperiumServerConfig<Connectors extends Connector = Connector, Environment extends ImperiumEnvironment = ImperiumEnvironment> {
	connectors: Connectors;
	serverModules: (() => ImperiumServerModule<Connectors, Environment>)[];
	environment?: {[P in keyof Environment]: ImperiumEnvironment};
	createContext: ContextCreators<Connectors>;
}

export default class ImperiumServer<Connectors extends Connector = Connector, Environment extends ImperiumEnvironment = ImperiumEnvironment> {
	private _expressApp: Application | null = null;
	private _httpServer: Server | null = null;
	private _middleware = {} as MiddlewareMap<this['context']>;

	public readonly serverModules: ImperiumServerModule<Connectors, Environment>[];
	public readonly environment: ImperiumEnvironment;
	public readonly connectors: Connectors;
	public readonly context: ContextCreators<Connectors>;

	constructor(config: ImperiumServerConfig<Connectors, Environment>) {
		// Loading server module definitions
		const serverModuleNames: string[] = [];
		// Load module definitions
		this.serverModules = config.serverModules.map(moduleFunc => {
			const moduleDefinition = moduleFunc();
			serverModuleNames.push(moduleDefinition.name || 'unnamed module');
			return moduleDefinition;
		});

		this.connectors = config.connectors;

		this.context = this.serverModules.reduce((memo, module) => {
			if (module.context) {
				return {
					...memo,
					...module.context,
				};
			}
			return memo;
		}, {} as this['context']);

		d(`Loaded modules: ${serverModuleNames.join(', ')}`);

		// Load Imperium environment
		d('Loading environment');
		this.environment = this.serverModules.reduce(
			(memo, module) => {
				if (module.environment && isFunction(module.environment)) {
					return {
						...memo,
						...module.environment(),
					};
				}
				return memo;
			},
			{...defaultEnvironment, ...(config.environment || {})} as Environment,
		);

		// Load Imperium Context
		d('Compiling context');
		this.context = this.serverModules.reduce((memo, module) => {
			if (module.context) {
				return {
					...memo,
					...module.context,
				};
			}
			return memo;
		}, {} as ContextCreators<Connectors>);
	}

	async start() {
		if (this._expressApp) throw new Error('Server already started');

		d('Connecting connectors');
		this.connectors.connect();

		d('Creating express app');
		this._expressApp = express();

		d('Creating HTTP server');
		this._httpServer = createServer(this._expressApp);

		d('Creating module middleware');
		this._middleware = this.serverModules.reduce(
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
					return ((req: ImperiumRequest, res: Response, next: NextFunction) => {
						dd(`Creating context manager for request to: ${req.baseUrl}`);
						let context = {};
						this.serverModules.forEach(module => {
							if (module.context && isFunction(module.context)) context = {...context, ...module.context};
						});
						// Add the context object to the req
						req.contextManager = new ContextManager(context, this.connectors);
						next();
					}) as ImperiumRequestHandler<Context>;
				},
			},
		);

		// Module endpoints
		d('Creating module endpoints');
		this.serverModules.forEach(module => {
			if (module.endpoints && isFunction(module.endpoints)) module.endpoints(this);
		});

		// Create startup promises (these are executed in the next section)
		const startupPromises = this.serverModules.reduce((memo, module) => {
			if (module.startup && isFunction(module.startup)) {
				const moduleStartupReturn = module.startup(this);
				if (moduleStartupReturn && isFunction(moduleStartupReturn.then)) {
					// Add a catch function to the promise
					moduleStartupReturn.catch((err) => {
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
		Promise.all(startupPromises).catch((err) => {
			d(`Module startup problem: ${err}`);
			throw err;
		});

		d('Starting server');
		this._httpServer.listen(this.environment.port, () => {
			d(`Now listening on port: ${this.environment.port}`);
		});

		return this;
	}

	async stop() {
		d('Closing connectors');
		await this.connectors.close();
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
}

const test = new ImperiumServer({
	serverModules: [
		() => ({
			name: 'test',
			context: conn => ({
				key: 'value',
			}),
		}),
	],
	connectors: new Connector({
		someConnector: {
			connect() {
				return 'yay';
			},
			close() {},
		},
	}),
});
