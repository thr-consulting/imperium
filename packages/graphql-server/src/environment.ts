import memoize from 'lodash/memoize';

export const environment = memoize(() => ({
	development: process.env.NODE_ENV === 'development',
	graphqlAccessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'notsecure',
	graphqlUrl: process.env.GRAPHQL_URL || '/api/graphql',
	graphqlCredentialsRequired: process.env.GRAPHQL_CREDENTIALS_REQUIRED === 'true',
	graphqlCorsOrigin: process.env.CORS_ORIGIN?.split(',') || false,
	graphqlWs: process.env.GRAPHQL_ENABLE_SUBSCRIPTIONS === 'true',
}));
