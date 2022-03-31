import type {ImperiumGraphqlClientModule} from '@imperium/graphql-client';
import {AuthGraphqlClientOptions, createLinks} from './apolloLink';

export function authGraphqlClientModule(options?: AuthGraphqlClientOptions): ImperiumGraphqlClientModule {
	return {
		name: '@imperium/auth-graphql-client',
		order: 25,
		apolloLinks: createLinks(options),
	};
}
