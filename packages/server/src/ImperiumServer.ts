/* eslint-disable no-console */
import express, {NextFunction, Response, Application, Request} from 'express';
import {createServer, Server} from 'http';
import debug from 'debug';
import chalk from 'chalk';
import isFunction from 'lodash/isFunction';
import {Connector} from '@imperium/context-manager';

const d = debug('imperium.server.ImperiumServer');
const dd = debug('verbose.imperium.server.ImperiumServer');

// basically a primitive recursive object.
export type Environment<T = boolean | string | number | string[]> = {
	[key: string]: T | Environment;
};

export interface ImperiumRequest<C> extends Request {
	context: C;
}
export type ImperiumRequestHandler<C> = (req: ImperiumRequest<C>, res: Response, next: NextFunction) => void;

export interface MiddlewareMap<C> {
	[key: string]: () => ImperiumRequestHandler<C>;
}

// Server modules don't define context, they consume it.
export interface ImperiumServerModule<Context, Connectors extends Connector> {
	name: string;
	// Defines middleware for other modules to use.
	middleware?: (server: ImperiumServer<Context, Connectors>) => MiddlewareMap<Context>;
	// uses middleware to create an endpoint.
	endpoints?: (server: ImperiumServer<Context, Connectors>) => void;
	startup?: (server: ImperiumServer<Context, Connectors>, context: Context) => Promise<void>;
}

export interface ImperiumServerConfig<Context, Connectors extends Connector> {
	// Connection for the creation of ContextManager
	connectors: Connectors;
	serverModules: ImperiumServerModule<Context, Connectors>[];
	contextCreator: (connector: Connectors) => Context;
}

export default class ImperiumServer<Context, Connectors extends Connector> {
	private readonly contextCreator: (connector: Connectors) => Context;
	private _expressApp: Application | null = null;
	private _httpServer: Server | null = null;

	public readonly connectors: Connectors;
	public readonly middleware = {} as MiddlewareMap<Context>;
	public readonly modules: ImperiumServerModule<Context, Connectors>[];

	constructor(config: ImperiumServerConfig<Context, Connectors>) {
		this.connectors = config.connectors;
		this.contextCreator = config.contextCreator;
		this.modules = config.serverModules;

		d('Compiling module middleware');
		this.middleware = this.modules.reduce(
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
						req.context = this.contextCreator(this.connectors);
						next();
					}) as ImperiumRequestHandler<Context>;
				},
			},
		);

		d(`Loaded modules: ${this.modules.map(module => module.name).join(', ')}`);
	}

	async start({port}: {port: number}) {
		if (this._expressApp) throw new Error('Server already started');

		d('Connecting connectors');
		await this.connectors.connect();

		d('Creating express app');
		this._expressApp = express();

		d('Creating HTTP server');
		this._httpServer = createServer(this._expressApp);

		// Module endpoints
		d('Creating module endpoints');
		this.modules.forEach(module => {
			if (module.endpoints && isFunction(module.endpoints)) module.endpoints(this);
		});

		d('Creating startup context');
		// Create startup promises (these are executed in the next section)
		const startupContext = this.contextCreator(this.connectors);
		const startupPromises = this.modules.reduce((memo, module) => {
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
		await Promise.all(startupPromises).catch(err => {
			d(`Module startup problem: ${err}`);
			throw err;
		});

		d('Starting server');
		this._httpServer.listen(port, () => {
			d(`Now listening on port: ${port}`);
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
