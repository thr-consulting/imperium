import {IImperiumServer, ImperiumServerModule} from '@imperium/server';
import {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import debug from 'debug';
import {schema, resolvers} from './graphql';
import {MyCounterContext} from './models/MyCounter';

const d = debug('app.sample');

export function SampleContext(server: IImperiumServer) {
	return {
		...MyCounterContext(server),
	};
}

export default function sample(): ImperiumServerModule & ImperiumGraphqlServerModule {
	return {
		name: 'Sample',
		schema,
		resolvers,
	};
}
