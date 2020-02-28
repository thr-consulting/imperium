import {ApolloLink} from 'apollo-link';
import {IImperiumClient} from '@imperium/client';

export interface ImperiumGraphqlClientModule {
	apolloLinks?: (client: IImperiumClient) => ApolloLink[];
}
