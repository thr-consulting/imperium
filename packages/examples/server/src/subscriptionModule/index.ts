import type {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import debug from 'debug';
import type {connectors} from '../core/connectors';
import schema from './Schema.graphqls';
import query from './Query.graphqls';
import {resolvers} from './resolvers';
import type {Context} from '../core/context';

const d = debug('imperium.examples.server.subscriptionsModule');

export const subscriptionModule = (): ImperiumGraphqlServerModule<Context, typeof connectors> => ({
	name: 'Subscription Server Module',
	schema: [schema, query],
	resolvers,
});
