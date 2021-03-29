import memoize from 'lodash/memoize';

export const environment = memoize(() => ({
	development: process.env.NODE_ENV === 'development',
	production: process.env.NODE_ENV === 'production',

	corsOrigin: process.env.CORS_ORIGIN || false,

	postgresUrl: process.env.POSTGRESQL_URL || '',
	postgresSSLCA: process.env.POSTGRESQL_SSL_CA || undefined,
	postgresLogging: process.env.POSTGRESQL_LOGGING === 'true',

	redisHost: process.env.REDIS_HOST,
	redisPort: parseInt(process.env.REDIS_PORT || '6379', 10),
	redisDb: parseInt(process.env.REDIS_DB || '0', 10),

	subscriptions: process.env.GRAPHQL_ENABLE_SUBSCRIPTIONS === 'true',
}));
