import {authMiddleware} from '@imperium/auth-server';
import type {ImperiumGraphqlServerModule} from '@imperium/graphql-server';
import debug from 'debug';
import {getCorsOrigin} from '@thx/env';
import cors from 'cors';
import type {Context} from '~core/context';
import Sample from './Auth.graphqls';
import {resolvers} from './authResolvers';

const d = debug('imperium.server.authModule');

export const authModule = (): ImperiumGraphqlServerModule<Context> => ({
	name: 'Server Module with Authorization',
	schema: [Sample],
	resolvers,
	endpoints: async server => {
		const corsMiddleware = cors({
			origin: getCorsOrigin(),
			credentials: true,
		});

		const url = '/express';

		server.expressApp.options(url, corsMiddleware);
		server.expressApp.post(url, corsMiddleware, authMiddleware({credentialsRequired: true}), server.contextMiddleware(), async (req, res, next) => {
			res.status(200).json({value: 'something'});
			next();
		});
	},
});
