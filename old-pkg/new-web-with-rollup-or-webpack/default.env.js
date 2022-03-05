// Copy this file to env.js

window.__IMPERIUM_ENV__ = {
	graphqlws: 'ws://localhost:4001/api/graphql',
	apolloDefaults: {
		query: {
			fetchPolicy: 'cache-first',
			errorPolicy: 'all',
		},
		watchQuery: {
			fetchPolicy: 'cache-and-network',
			errorPolicy: 'ignore',
		},
		mutate: {
			fetchPolicy: 'no-cache',
			errorPolicy: 'all',
		},
	},
};
