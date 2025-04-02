import type {ImperiumGraphqlClientModule} from '@imperium/graphql-client';
import {AuthGraphqlBacking} from './AuthGraphqlBacking';
import {type AuthGraphqlClientOptions, createLinks} from './apolloLink';
import {withAuthGraphql} from './withAuthGraphql';

const authGraphqlBacking = new AuthGraphqlBacking();

export function authGraphqlClientModule(options?: AuthGraphqlClientOptions): ImperiumGraphqlClientModule {
	return {
		name: '@imperium/auth-graphql-client',
		order: 25,
		apolloLinks: createLinks(authGraphqlBacking, options),
		hocs: [withAuthGraphql({backing: authGraphqlBacking})],
	};
}
