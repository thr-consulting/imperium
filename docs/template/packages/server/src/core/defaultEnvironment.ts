export const defaultEnvironment = {
	// ## Core Variables
	SERVER_PORT: 4001, // The TCP port the main express server is run on
	CORS_ORIGIN: false, // When false, disable CORS, otherwise a string of allowed origins

	// ## @imperium/graphql-server
	GRAPHQL_CREDENTIALS_REQUIRED: true, // Require all requests to the graphql endpoint to be authenticated via JWT header

	// ## @imperium/auth-server
	AUTH_PASSWORD_SALT_ROUNDS: 11,

	// # Security measure for registration links
	// JWT_SECRET_KEY: 'nosecret',
	// JWT_EXPIRES_IN: 21600,

	// ## Postgresql connector
	// POSTGRESQL_URL: '',
	POSTGRESQL_LOGGING: false,
	// POSTGRESQL_SSL: false,
	// POSTGRESQL_REJECT_UNAUTHORIZED: true

	// Redis connector
	REDIS_HOST: '127.0.0.1',
	REDIS_PORT: 6379,
	REDIS_DB: 0,
};
