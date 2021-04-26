import type {ImperiumGraphqlClientModule} from '@imperium/graphql-client';
import {AuthGraphqlClientOptions, createLinks} from './apolloLink';

export function authGraphqlClientModule(options?: AuthGraphqlClientOptions): ImperiumGraphqlClientModule {
	return {
		name: '@imperium/auth-graphql-client',
		apolloLinks: createLinks(options),
		environmentDefaults: {
			// These defaults are defined in @imperium/auth-client but we use the values in this package.
			// authAccessTokenKey
			// authIdKey
		},
	};
}
