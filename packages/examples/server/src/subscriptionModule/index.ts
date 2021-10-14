import type {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import debug from 'debug';
import type {Context} from '~core/context';
import query from './Query.graphqls';
import schema from './Schema.graphqls';
import {resolvers} from './resolvers';

const d = debug('imperium.examples.server.subscriptionModule');

export const subscriptionModule = (): ImperiumGraphqlServerModule<Context> => ({
	name: 'Subscription Server Module',
	schema: [schema, query],
	resolvers,
});
