import debug from 'debug';
import type {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import schema from './Schema.graphqls';
import query from './Query.graphqls';
import {resolvers} from './resolvers';
import type {Context} from '../core/context';

const d = debug('imperium.examples.server.subscriptionsModule');

export const subscriptionModule = (): ImperiumGraphqlServerModule<Context> => ({
	name: 'Subscription Server Module',
	schema: [schema, query],
	resolvers,
});
