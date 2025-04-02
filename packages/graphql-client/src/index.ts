import type {ImperiumClientModule} from '@imperium/client';
import {withGraphql, type GraphqlClientOptions} from './withGraphql';

/**
 * Imperium Graphql Module
 */
export function graphqlClientModule(opts?: GraphqlClientOptions): ImperiumClientModule {
	return {
		name: '@imperium/graphql-client',
		order: 5,
		hocs: [withGraphql(opts)],
	};
}

export type {ImperiumGraphqlClientModule} from './types';
export {isFragmentSpreadNode, isFieldNode, isDirectiveDefinitionNode} from './typeguards';
export {ImperiumGraphqlContext} from './ImperiumGraphqlContext';
