import debug from 'debug';
import express from 'express';
import path from 'path';
import cors from 'cors';
import bodyParser from 'body-parser';
import isFunction from 'lodash/isFunction';
import createHtml from './createHtml';
// import {createConnectors} from '../data/connectors';
// import loadModules from '../data/serverModules';
import production from './endpoints/production';
import initialState from './endpoints/initialState';
// import graphql from './endpoints/graphql';
// import graphiql from './endpoints/graphiql';
import context from './middleware/context';

const d = debug('imperium.core.server.worker');

export default function worker(sc, {
	Connectors,
	serverModules,
	hmr,
}) {
	d(`  >> Worker PID: ${process.pid}`);

	// const isProduction = process.env.NODE_ENV === 'production';
	const isDevelopment = process.env.NODE_ENV === 'development';

	if (!Connectors) {
		throw new Error('Connectors.js not defined in your src folder');
	}

	// Create connectors
	const connector = new Connectors();
	connector.create().then(connectors => {
		// Load modules - Runs module definition functions and stores the objects
		d('Loading modules');
		const modules = serverModules.map(moduleFunc => moduleFunc());

		// Create the express app and hook it into SocketCluster
		d('Creating express app');
		const app = express();
		sc.httpServer.on('request', app); // Hook express up to socketcluster

		// Webpack Dev & HMR (dev only)
		let waitUntilClientIsValid = a => a(); // Default is to just call the function that is passed to this function.
		if (isDevelopment && hmr) waitUntilClientIsValid = hmr(app).waitUntilValid;

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

		// TODO Graphql endpoints

		// Module custom endpoints
		modules.forEach(module => {
			if (module.endpoints && isFunction(module.endpoints)) module.endpoints({app, connectors, modules});
		});

		// In development mode, we wait until webpack-dev-middleware is finished building before loading the index.html file.
		// All other normal endpoints. (First load assets, then start hook)
		waitUntilClientIsValid(() => {
			createHtml().then(normalRequestMiddleware => {
				app.get('*', normalRequestMiddleware);
			});
		});

		// Create a context for use when the server first starts up.
		const req = {};
		context({connectors, modules})(req, null, () => {});

		// Run each module's startup code
		const startupPromises = modules.reduce((memo, module) => {
			if (module.startup && isFunction(module.startup)) {
				return [...memo, module.startup(req.context)];
			}
			return memo;
		}, []);
		// Execute module startup promises
		Promise.all(startupPromises).catch(err => {
			d(`Server startup problem: ${err}`);
		});
	}).catch(reason => {
		console.log('ERROR: Connectors couldn\'t be created.'); // eslint-disable-line no-console
		console.log(reason); // eslint-disable-line no-console
		sc.scServer.close();
	});
}
