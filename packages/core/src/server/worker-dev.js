/*
import webpack from 'webpack';
import expressPlayground from 'graphql-playground-middleware-express';

import config from '../../../webpack/webpack.config.dev';
*/
import Worker from './worker';

/**
 * Adds Hot Module Reloading
 * @param app
 */
function hmr(app) {
	const compiler = webpack(config);
	app.use(require('webpack-dev-middleware')(compiler, { // eslint-disable-line global-require
		noInfo: true,
		publicPath: config.output.publicPath,
	}));
	app.use(require('webpack-hot-middleware')(compiler)); // eslint-disable-line global-require
}

/**
 * Adds GraphQL interactive route at /graphiql
 * @param app
 */
function graphiql(app) {
	app.use('/graphiql', expressPlayground({
		endpoint: '/api/graphql',
	}));
}

export function run(worker) {
	Worker(worker, {
		// hmr,
		// graphiql,
	});
}
