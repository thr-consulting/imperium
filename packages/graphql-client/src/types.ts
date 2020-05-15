import type {ApolloLink} from 'apollo-link';
import type {IImperiumClient} from '@imperium/client';

export interface ImperiumGraphqlClientModule {
	apolloLinks?: (client: IImperiumClient) => ApolloLink[];
}
