import type {ImperiumClientModule} from '@imperium/client';
import withGraphql from './withGraphql';

/**
 * Imperium Graphql Module
 */
export function graphqlClientModule(): ImperiumClientModule {
	return {
		name: '@imperium/graphql-client',
		hocs: [withGraphql],
	};
}

export {ImperiumGraphqlClientModule} from './types';
