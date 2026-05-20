import type {ApolloLink} from '@apollo/client';
import type {ImperiumClient, ImperiumClientModule} from '@imperium/client';

export interface ImperiumGraphqlClientModule extends ImperiumClientModule {
	apolloLinks: (client: ImperiumClient) => ApolloLink[];
}

export function isImperiumGraphqlClientModule(value: ImperiumClientModule): value is ImperiumGraphqlClientModule {
	return (value as ImperiumGraphqlClientModule).apolloLinks !== undefined && typeof (value as ImperiumGraphqlClientModule).apolloLinks === 'function';
}
