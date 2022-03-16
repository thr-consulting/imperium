import type {ImperiumServerModule} from '@imperium/server';
import {endpoints} from './endpoints';
import type {GraphqlServerModuleConfig} from './types';

export type {GraphQLRequestContext} from 'apollo-server-types';

/**
 * The graphql server module needs to be added to Imperium server modules to enable graphql endpoints.
 * @param config
 */
export function graphqlServerModule<T>(config?: GraphqlServerModuleConfig<T>): ImperiumServerModule<any> {
	return {
		name: '@imperium/graphql-server',
		endpoints: endpoints<T>(config),
		environmentDefaults: {
			IMP_GRAPHQL_URL: '/api/graphql',
			// CORS_ORIGIN: '', // No default
			IMP_GRAPHQL_ENABLE_SUBSCRIPTIONS: true,
			IMP_GRAPHQL_BODY_LIMIT: '1mb',
		},
	};
}

export type {ImperiumGraphqlServerModule, GraphqlServerModuleConfig} from './types';
