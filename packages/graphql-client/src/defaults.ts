export const defaults = {
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
	graphql: 'http://localhost:4001/api/graphql',
	graphqlws: '', // ws://localhost:4001/api/graphql',
};
