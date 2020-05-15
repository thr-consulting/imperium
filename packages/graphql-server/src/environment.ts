import memoize from 'lodash/memoize';

export const environment = memoize(() => ({
	development: process.env.NODE_ENV === 'development',
	graphqlUrl: process.env.GRAPHQL_URL || '/api/graphql',
	graphqlCorsOrigin: process.env.CORS_ORIGIN?.split(',') || false,
	graphqlWs: process.env.GRAPHQL_ENABLE_SUBSCRIPTIONS === 'true',
}));
