import type {ApolloLink} from '@apollo/client';
import type {IImperiumClient} from '@imperium/client';

export interface ImperiumGraphqlClientModule {
	apolloLinks?: (client: IImperiumClient) => ApolloLink[];
}
