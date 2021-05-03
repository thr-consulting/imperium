import {Environment} from '@thx/env';

Environment.addDefaults({
	GRAPHQL_URL: '/api/graphql',
	// CORS_ORIGIN: '', // No default
	GRAPHQL_ENABLE_SUBSCRIPTIONS: true,
	GRAPHQL_BODY_LIMIT: '1mb',
});
