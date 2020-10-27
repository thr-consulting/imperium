import type {ImperiumClientModule} from '@imperium/client';
import {withGraphql, GraphqlClientOptions} from './withGraphql';

/**
 * Imperium Graphql Module
 */
export function graphqlClientModule(opts?: GraphqlClientOptions): ImperiumClientModule {
	return {
		name: '@imperium/graphql-client',
		hocs: [withGraphql(opts)],
	};
}

export {ImperiumGraphqlClientModule} from './types';
export {isFragmentSpreadNode, isFieldNode, isDirectiveDefinitionNode} from './typeguards';
