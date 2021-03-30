import type {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import debug from 'debug';
import schema from './Schema.graphqls';
import query from './Query.graphqls';
import {resolvers} from './resolvers';
import type {Context} from '../core/context';

const d = debug('imperium.examples.server.authorizationModule');

export const authorizationModule = (): ImperiumGraphqlServerModule<Context> => ({
	name: 'Authorization Server Module',
	schema: [schema, query],
	resolvers,
});
