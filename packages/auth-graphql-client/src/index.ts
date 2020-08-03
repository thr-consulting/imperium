import type {ImperiumClientModule} from '@imperium/client';
import type {ImperiumGraphqlClientModule} from '@imperium/graphql-client';
import {createLinks} from './apolloLink';

export default function (): ImperiumClientModule & ImperiumGraphqlClientModule {
	return {
		name: '@imperium/auth-graphql-client',
		apolloLinks: createLinks,
	};
}
