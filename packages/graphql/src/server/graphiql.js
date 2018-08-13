import expressPlayground from 'graphql-playground-middleware-express';

const isDevelopment = process.env.NODE_ENV === 'development';

export default function({app}) {
	if (isDevelopment) {
		app.use('/graphiql', expressPlayground({
			endpoint: '/api/graphql',
		}));
	}
}
