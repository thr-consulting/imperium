import debug from 'debug';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import isFunction from 'lodash/isFunction';
import createHtml from './createHtml';
import production from './endpoints/production';
import initialState from './endpoints/initialState';
import middleware from './middleware';
import {ImperiumRequest, ServerModule} from '../../types';

const d = debug('imperium.core.server.worker');

export default function worker(sc, {
	Connectors,
	serverModules,
	hmr,
}): void {
	d(`  >> Worker PID: ${process.pid}`);

	// const isProduction = process.env.NODE_ENV === 'production';
	const isDevelopment = process.env.NODE_ENV === 'development';

	if (!Connectors) {
		throw new Error('Connectors.js not defined in your Imperium configuration folder');
	}

	// Create connectors
	d('Creating connectors');
	const connector = new Connectors();
	connector.create().then(connectors => {
		// Load modules - Runs module definition functions and stores the objects
		d('Loading modules: ', serverModules.map(v => v.name).join(', '));
		const modules: ServerModule[] = serverModules.map(moduleFunc => moduleFunc());

		// Create the express app and hook it into SocketCluster
		d('Creating express app');
		const app = express();
		sc.httpServer.on('request', app); // Hook express up to socketcluster

		// Webpack Dev & HMR (dev only)
		let hmrInstance; // We store webpack-dev-middleware instance for later
		if (isDevelopment && hmr) hmrInstance = hmr(app);

		// Setup Express middleware
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(bodyParser.json());
		app.use(cors({origin: true, credentials: true}));
		app.use((req, res, next) => { // TODO move favicon to HTML generation in webpack
			if (/\/favicon\.?(jpe?g|png|ico|gif)?$/i.test(req.url)) {
				res.status(404).end();
			} else {
				next();
			}
		});

		// Production only endpoint for client chunks
		production({app});

		// End point to retrieve the initial state. Must provide a valid JWT to access this endpoint.
		initialState({app, connectors, modules});

		// Module custom endpoints
		d('Creating module custom endpoints');
		modules.forEach(module => {
			if (module.endpoints && isFunction(module.endpoints)) module.endpoints({app, connectors, modules, middleware});
		});

		// All other normal endpoints. (First load assets, then start hook)
		createHtml(hmrInstance).then(normalRequestMiddleware => {
			d('Adding default endpoint');
			app.get('*', normalRequestMiddleware);
		});

		// Create a context for use when the server first starts up.
		// @ts-ignore
		const req: ImperiumRequest = {};
		middleware.context({connectors, modules})(req, null, () => {});

		// Get Promise's for each module's startup code
		const startupPromises = modules.reduce((memo, module) => {
			if (module.startup && isFunction(module.startup)) {
				return [...memo, module.startup(req.context)];
			}
			return memo;
		}, [] as Promise<any>[]);

		// Execute module startup promises
		d('Executing module startup');
		Promise.all(startupPromises).catch(err => {
			d(`Module startup problem: ${err}`);
		});
	}).catch(reason => {
		console.log('ERROR: Connectors couldn\'t be created.'); // eslint-disable-line no-console
		console.log(reason); // eslint-disable-line no-console
		sc.scServer.close();
	});
}
