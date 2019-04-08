import debug from 'debug';
import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

const d = debug('imperium.graphql.client.startup');

export default function startup({graphql, jwt_localstorage_name}): {} { // eslint-disable-line @typescript-eslint/camelcase
	d('Creating Apollo client');

	// Create Apollo HTTP link
	const httpLink = createHttpLink({uri: graphql});

	// Create Apollo middleware link (for authorization)
	const middlewareLink = new ApolloLink((operation, forward) => {
		const jwt = window.localStorage.getItem(jwt_localstorage_name);
		if (jwt) {
			operation.setContext({
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			});
		}
		// @ts-ignore
		return forward(operation);
	});
	const apolloLink = middlewareLink.concat(httpLink);

	// Configure Apollo GraphQL client
	const apolloClient = new ApolloClient(({
		link: apolloLink,
		cache: new InMemoryCache(),
	}));

	return {
		apolloClient,
	};
}
