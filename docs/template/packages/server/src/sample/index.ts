import type {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import debug from 'debug';
import type {Context} from '../../../home/mike/dev/khords/packages/server/src/core/createDomain';
import {resolvers} from './resolvers';
import {schema} from './schema';

const d = debug('template.server.sample');

export function sampleModule(): ImperiumGraphqlServerModule<Context> {
	return {
		name: 'Sample',
		schema,
		resolvers,
	};
}
