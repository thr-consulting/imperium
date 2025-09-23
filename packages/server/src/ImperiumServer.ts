/* eslint-disable no-console */
import type {AuthenticationRequest} from '@imperium/authorization';
import type {Connectors} from '@imperium/connector';
import debug from 'debug';
import express, {type Application, type RequestHandler} from 'express';
import {createServer, type Server} from 'http';
import {isFunction} from 'lodash-es';
import cors from 'cors';
import type {ImperiumServerConfig, ImperiumServerModule} from './types';

const d = debug('imperium.server.ImperiumServer');

export class ImperiumServer<Context> {
	private readonly _moduleFactoryFn: () => ImperiumServerModule<Context>[];

	private readonly _contextCreator: (connector: Connectors, authenticatedUser?: AuthenticationRequest) => Promise<Context>;

	private _expressApp: Application | null = null;

	private _httpServer: Server | null = null;

	private readonly _httpPort: number;

	private _modules: ImperiumServerModule<Context>[];

	private readonly corsOrigin?: boolean | string | RegExp | string[];

	public readonly connectors: Connectors;

	public constructor(config: ImperiumServerConfig<Context>) {
		this.connectors = config.connectors;
		this._contextCreator = config.contextCreator;
		this._moduleFactoryFn = config.serverModules;
		this._httpPort = config.httpPort || -1;
		this._modules = [];
		this.corsOrigin = config.corsOrigin;
	}

	/**
	 * Create a context object
	 * @param authenticatedRequest
	 */
	public createContext(authenticatedRequest?: AuthenticationRequest): Promise<Context> {
		return this._contextCreator(this.connectors, authenticatedRequest);
	}

	/**
	 * Express middleware used to create a new context and place it on `req.context`.
	 */
	public contextMiddleware(): RequestHandler {
		return (req, res, next) => {
			// @ts-ignore
			this.createContext(req)
				.then(ctx => {
					// @ts-ignore
					req.context = ctx;
					next();
				})
				.catch(err => d(err));
		};
	}

	/**
	 * Start the Imperium server
	 */
	public async start(): Promise<this> {
		d('Starting ImperiumServer...');
		if (this._expressApp) throw new Error('Server already started');

		this._modules = this._moduleFactoryFn();
		d(`Loaded modules: ${this._modules.map(module => module.name).join(', ')}`);

		// Connect connectors
		await this.connectors.connect();

		if (this._httpPort > 0) {
			d('Creating HTTP server and express app');
			this._expressApp = express();
			this._httpServer = createServer(this._expressApp);

			const corsMiddleware = cors({
				origin: this.corsOrigin,
				credentials: true,
			});

			this._expressApp.use(corsMiddleware);
			this._expressApp.options('*', corsMiddleware);
		}

		// Module endpoints
		d('Creating module endpoints');
		await Promise.all(
			this.modules.map(async module => {
				if (module.endpoints && isFunction(module.endpoints)) await module.endpoints(this);
			}),
		);

		const startupPromises = this.modules.reduce(
			(memo, module) => {
				if (module.startup && isFunction(module.startup)) {
					const moduleStartupReturn = module.startup(this);
					if (moduleStartupReturn && isFunction(moduleStartupReturn.then)) {
						// Add a catch function to the promise
						moduleStartupReturn.catch(err => {
							console.group('Error running module startup');
							console.error(err);
							console.groupEnd();
							return Promise.reject(err);
						});
					}
					return [...memo, moduleStartupReturn];
				}
				return memo;
			},
			[] as Promise<any | void>[],
		);

		// Execute startup promises
		d('Executing module startup');
		await Promise.all(startupPromises).catch(err => {
			d(`Module startup problem: ${err}`);
			throw err;
		});

		if (this._httpServer) {
			d('Starting server');
			this._httpServer.listen(this._httpPort, () => {
				d(`Now listening on port: ${this._httpPort}`);
			});
		} else {
			// eslint-disable-next-line @typescript-eslint/no-implied-eval, no-new-func
			const noop = Function();
			// eslint-disable-next-line @typescript-eslint/no-implied-eval
			setInterval(noop, 10000);
			d('Running');
		}

		return this;
	}

	/**
	 * Stop the server, closing the connectors
	 */
	public async stop(): Promise<void> {
		d('Closing connectors');
		await this.connectors.close();
	}

	/**
	 * Return the loaded server modules.
	 */
	public get modules(): ImperiumServerModule<Context>[] {
		return this._modules;
	}

	/**
	 * Return the express app
	 */
	public get expressApp(): Application {
		if (this._expressApp) return this._expressApp;
		throw new Error('Imperium server not started or Express disabled.');
	}

	/**
	 * Return the HTTP server
	 */
	public get httpServer(): Server {
		if (this._httpServer) return this._httpServer;
		throw new Error('Imperium server not started or Express disabled.');
	}
}
