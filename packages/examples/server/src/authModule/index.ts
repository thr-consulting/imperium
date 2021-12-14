import type {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import debug from 'debug';
import type {Context} from '~core/context';
import Sample from './Auth.graphqls';
import {resolvers} from './authResolvers';

const d = debug('imperium.examples.server.authModule');

export const authModule = (): ImperiumGraphqlServerModule<Context> => ({
	name: 'Server Module with Authorization',
	schema: [Sample],
	resolvers,
});
