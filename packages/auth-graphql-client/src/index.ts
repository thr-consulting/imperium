import type {ImperiumGraphqlClientModule} from '@imperium/graphql-client';
import {AuthGraphqlClientOptions, createLinks} from './apolloLink';

export default function authGraphqlClient(options?: AuthGraphqlClientOptions): ImperiumGraphqlClientModule {
	return {
		name: '@imperium/auth-graphql-client',
		apolloLinks: createLinks(options),
	};
}
