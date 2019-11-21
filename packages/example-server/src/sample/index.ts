import {ImperiumServerModule} from '@imperium/server';
import {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import debug from 'debug';
import {schema, resolvers} from './graphql';

const d = debug('app.sample');

export default function sample(): ImperiumServerModule & ImperiumGraphqlServerModule {
	return {
		name: 'Sample',
		schema,
		resolvers,
	};
}
