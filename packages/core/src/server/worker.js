import debug from 'debug';
import express from 'express';
import path from 'path';
// import cors from 'cors';
// import bodyParser from 'body-parser';
// import isFunction from 'lodash/isFunction';
// import createHtml from './createHtml';
// import {createConnectors} from '../data/connectors';
// import loadModules from '../data/serverModules';
// import production from './endpoints/production';
// import initialState from './endpoints/initialState';
// import graphql from './endpoints/graphql';
// import graphiql from './endpoints/graphiql';
// import contextMiddleware from './middleware/contextMiddleware';

const d = debug('imperium.scripts.worker');

export default function worker(sc, {
	Connectors,
	hmr,
}) {
	d(`  >> Worker PID: ${process.pid}`);

	const isProduction = process.env.NODE_ENV === 'production';
	const isDevelopment = process.env.NODE_ENV === 'development';

	if (!Connectors) {
		throw new Error('Connectors.js not defined in your src folder');
	}

	// Create connectors
	const connector = new Connectors();
	connector.create().then(connectors => {
		// Create the express app and hook it into SocketCluster
		d('Creating express app');
		const app = express();
		sc.httpServer.on('request', app); // Hook express up to socketcluster

		// HMR (dev only)
		if (isDevelopment && hmr) hmr(app);

	}).catch(reason => {
		console.log('ERROR: Connectors couldn\'t be created.'); // eslint-disable-line no-console
		console.log(reason); // eslint-disable-line no-console
		sc.scServer.close();
	});

	/*
	createConnectors()
		.then(connectors => {
			// Load modules - Runs module definition functions and stores the objects
			d('Loading modules');
			const modules = loadModules.map(moduleFunc => moduleFunc());

			// Create the express app and hook it into SocketCluster
			d('Creating express app');
			const app = express();
			sc.httpServer.on('request', app); // Hook express up to socketcluster
			// HMR (dev only)
			if (!isProduction && options.hmr) options.hmr(app);

			// Setup Express middleware
			app.use(bodyParser.urlencoded({extended: true}));
			app.use(bodyParser.json());
			app.use(cors({origin: true, credentials: true}));
			app.use((req, res, next) => {
				if (/\/favicon\.?(jpe?g|png|ico|gif)?$/i.test(req.url)) {
					res.status(404).end();
				} else {
					next();
				}
			});

			// Production only endpoint
			production({app});

			// End point to retrieve the initial state. Must provide a valid JWT.
			initialState({app, connectors, modules});

			// Apollo GraphQL endpoint (Validate JWT -> load models & Auth/User info -> GraphQL request
			graphql({app, connectors, modules});

			// Development only GraphiQL tool
			graphiql({app, options});

			// Module custom endpoints
			modules.forEach(module => {
				if (module.endpoints && isFunction(module.endpoints)) module.endpoints({app, connectors, modules});
			});

			// Normal endpoints. (First load assets, then start hook)
			createHtml().then(normalRequestMiddleware => {
				app.get('*', normalRequestMiddleware);
			});

			// Handle sockets (not used at the moment)
			// scServer.on('connection', socket => {
			// 	d(`Client connected: ${socket.id}`);
			// 	socket.on('disconnect', () => d(`Client disconnected: ${socket.id}`));
			// });

			// Create a context for use when the server first starts up.
			const req = {};
			contextMiddleware({connectors, modules})(req, null, () => {});

			// Module startup code
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
		})
		.catch(reason => {
			console.log('ERROR: Connectors couldn\'t be created.'); // eslint-disable-line no-console
			console.log(reason); // eslint-disable-line no-console
			scServer.close();
		});
		*/
}
