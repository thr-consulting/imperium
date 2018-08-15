import debug from 'debug';
import expressPlayground from 'graphql-playground-middleware-express';

const d = debug('imperium.graphql.graphiql');
const isDevelopment = process.env.NODE_ENV === 'development';

export default function({app}) {
	if (isDevelopment) {
		d('Adding GraphQL Playground endpoint');
		app.use('/debug/graphql',
			expressPlayground({
				endpoint: '/api/graphql',
			}),
			(req, res, next) => {
				// This is the end of the line, not calling next().
				// This is needed to stop express from calling further middleware.
			},
		);
	}
}
