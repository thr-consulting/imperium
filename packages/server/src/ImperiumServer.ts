/* eslint-disable no-console */
import express, {Application, RequestHandler} from 'express';
import {createServer, Server} from 'http';
import debug from 'debug';
import isFunction from 'lodash/isFunction';
import type {Connector} from '@imperium/context-manager';
import type {ImperiumServerConfig, ImperiumServerModule} from './types';

const d = debug('imperium.server.ImperiumServer');

export class ImperiumServer<Context, Connectors extends Connector> {
	private readonly contextCreator: (connector: Connectors) => Context;
	private _expressApp: Application | null = null;
	private _httpServer: Server | null = null;

	public readonly connectors: Connectors;
	public readonly modules: ImperiumServerModule<Context, Connectors>[];

	public constructor(config: ImperiumServerConfig<Context, Connectors>) {
		this.connectors = config.connectors;
		this.contextCreator = config.contextCreator;
		this.modules = config.serverModules;

		d(`Loaded modules: ${this.modules.map(module => module.name).join(', ')}`);
	}

	/**
	 * Express middleware used to create a new context and place it on `req.context`.
	 */
	public contextMiddleware(): RequestHandler {
		return (req, res, next) => {
			// @ts-ignore
			req.context = this.contextCreator(this.connectors);
			next();
		};
	}

	/**
	 * Start the Imperium server
	 * @param port
	 */
	public async start({port}: {port: number}) {
		if (this._expressApp) throw new Error('Server already started');

		// d('Connecting connectors');
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
						console.group('Error running module startup');
						console.error(err);
						console.groupEnd();
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

	/**
	 * Stop the server, closing the connectors
	 */
	public async stop() {
		d('Closing connectors');
		await this.connectors.close();
	}

	/**
	 * Return the express app
	 */
	public get expressApp(): Application {
		if (this._expressApp) return this._expressApp;
		throw new Error('Imperium server not started yet.');
	}

	/**
	 * Return the HTTP server
	 */
	public get httpServer(): Server {
		if (this._httpServer) return this._httpServer;
		throw new Error('Imperium server not started yet.');
	}
}
