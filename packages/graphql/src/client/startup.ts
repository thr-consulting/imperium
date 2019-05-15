import debug from 'debug';
import {ApolloClient} from 'apollo-client';
import {ApolloLink} from 'apollo-link';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {StartupData} from '@imperium/core';

const d = debug('imperium.graphql.startup');

export default function startup({graphql}, {apolloLinks}): StartupData { // eslint-disable-line @typescript-eslint/camelcase
	d('Creating Apollo client');

	// Create Apollo HTTP link
	const httpLink = createHttpLink({uri: graphql});

	const apolloLink = ApolloLink.from([
		...(apolloLinks || []),
		httpLink,
	]);
	// const apolloLink = refreshLink.concat(middlewareLink.concat(httpLink));

	// Configure Apollo GraphQL client
	const apolloClient = new ApolloClient(({
		link: apolloLink,
		cache: new InMemoryCache(),
	}));

	return {
		apolloClient,
	};
}
