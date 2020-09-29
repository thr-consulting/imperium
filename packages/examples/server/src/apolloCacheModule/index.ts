import type {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import debug from 'debug';
import {randomId, randomLetters} from '@thx/random';
import type {connectors} from '../core/connectors';
import type {Context} from '../core/context';
import Cache from './Cache.graphqls';

const d = debug('imperium.examples.server.apolloCacheModule');

/*
	This is an example of a server module that uses graphql.

	The ImperiumGraphqlServerModule type extends the base server module type to include
	schema, resolvers and schemaDirectives (not shown here).
 */

const data: any[] = [];
for (let i = 0; i < 10; i++) {
	data.push({
		id: randomId(),
		name: randomLetters(8),
		type: 'PHONE',
	});
}
for (let i = 0; i < 10; i++) {
	data.push({
		id: randomId(),
		name: randomLetters(8),
		type: 'EMAIL',
	});
}

export const apolloCacheModule = (): ImperiumGraphqlServerModule<Context, typeof connectors> => ({
	name: 'Server Module with cache GraphQL',
	schema: [Cache],
	resolvers(server) {
		return {
			Query: {
				async getCacheList(obj, value, ctx) {
					return data.filter(v => v.type === value.filter);
				},
			},
		};
	},
});
