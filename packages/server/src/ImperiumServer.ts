/* eslint-disable no-console */
import {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import express, {NextFunction, Response, Application, Request} from 'express';
import {createServer, Server} from 'http';
import debug from 'debug';
import chalk from 'chalk';
import isFunction from 'lodash/isFunction';
import {Connector} from './Connector';
import {ContextCreators, ContextManager} from './ContextManager';
import {Context} from './types';

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

export type ImperiumServerModule<Connectors extends Connector, Environment extends ImperiumEnvironment = {}, Context = any> = {
	name: string;
	middleware?: (server: ImperiumServer<Connectors, Environment, Context>) => MiddlewareMap<any>;
	endpoints?: (server: ImperiumServer<Connectors, Environment, Context>) => void;
	startup?: (server: ImperiumServer<Connectors, Environment, Context>, context: Context) => Promise<void>;
};

export interface ImperiumServerConfig<
	Connectors extends Connector = Connector,
	Environment extends ImperiumEnvironment = ImperiumEnvironment,
	Context
> {
	// Connection for the creation of ContextManager
	connectors: Connectors;
	environment?: Environment;
	serverModules: ImperiumServerModule<Connectors, Environment, Context>[];
	contextCreator: (connector: Connectors) => Context;
}

export default class ImperiumServer<
	Connectors extends Connector = Connector,
	Environment extends ImperiumEnvironment = ImperiumEnvironment,
	Context = any
> {
	private readonly contextCreator: (connector: Connectors) => Context;
	private _expressApp: Application | null = null;
	private _httpServer: Server | null = null;

	public readonly connectors: Connectors;
	public readonly environment: Environment;
	public readonly middleware = {} as MiddlewareMap<Context>;
	public readonly serverModules: ImperiumServerModule<Connectors, Environment, Context>[];

	constructor(config: ImperiumServerConfig<Connectors, Environment, Context>) {
		this.connectors = config.connectors;
		this.contextCreator = config.contextCreator;
		this.environment = config.environment || ({} as Environment);
		this.serverModules = config.serverModules;

		d('Compiling module middleware');
		this.middleware = this.serverModules.reduce(
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
					return ((req, res, next) => {
						dd(`Creating context manager for request to: ${req.baseUrl}`);
						req.contextManager = this.contextCreator(this.connectors);
						next();
					}) as ImperiumRequestHandler<Context>;
				},
			},
		);

		d(`Loaded modules: ${this.serverModules.map(module => module.name).join(', ')}`);
	}

	async start() {
		if (this._expressApp) throw new Error('Server already started');

		d('Connecting connectors');
		this.connectors.connect();

		d('Creating express app');
		this._expressApp = express();

		d('Creating HTTP server');
		this._httpServer = createServer(this._expressApp);

		// Module endpoints
		d('Creating module endpoints');
		this.serverModules.forEach(module => {
			if (module.endpoints && isFunction(module.endpoints)) module.endpoints(this);
		});

		// Create startup promises (these are executed in the next section)
		const startupContext = this.contextCreator(this.connectors);
		const startupPromises = this.serverModules.reduce((memo, module) => {
			if (module.startup && isFunction(module.startup)) {
				const moduleStartupReturn = module.startup(this, startupContext);
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
}

// Example ====

const connectors = new Connector({
	test: {
		connect() {
			return 'test';
		},
		close() {},
	},
});

function contextCreator(connector: typeof connectors) {
	return new ContextManager(
		{
			MyContext: conn => conn.connections.test,
		},
		connector,
	);
}

const environment = {
	test: 0,
};

const serverModule = {
	name: 'test module',
	startup(server, context) {
		console.log(server.environment.test);
		console.log(context.context.MyContext);
	},
} as ImperiumServerModule<typeof connectors, typeof environment, ReturnType<typeof contextCreator>> & ImperiumGraphqlServerModule;

const test = new ImperiumServer({
	contextCreator,
	connectors,
	serverModules: [serverModule],
	environment,
});
