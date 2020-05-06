import debug from 'debug';
import {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import type {connectors} from '../core/connectors';
import type {Context} from '../core/server';
import Sample from './Sample.graphqls';

const d = debug('imperium.example-server2.graphqlModule');

export const graphqlModule: ImperiumGraphqlServerModule<Context, typeof connectors> = {
	name: 'Server Module with GraphQL',
	schema: [Sample],
	resolvers(server) {
		return {
			Query: {
				getData(obj, value, ctx) {
					d(obj, value);
					d('getData');
				},
			},
		};
	},
};
