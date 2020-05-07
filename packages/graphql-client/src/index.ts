import type {ImperiumClientModule} from '@imperium/client';
import withGraphql from './withGraphql';

/**
 * Imperium Graphql Module
 */
export default function (): ImperiumClientModule {
	return {
		name: '@imperium/graphql-client',
		hocs: [withGraphql],
	};
}

export {ImperiumGraphqlClientModule} from './types';
