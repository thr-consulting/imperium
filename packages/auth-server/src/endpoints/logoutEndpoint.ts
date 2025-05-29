import type {ImperiumServer} from '@imperium/server';
import {env, getCorsOrigin} from '@thx/env';
import bodyParser from 'body-parser';
import type {CorsOptions} from 'cors';
import cors from 'cors';
import debug from 'debug';
import {defaults} from '../defaults';
import {isLogoutInfo} from '../lib/typeguards';
import {type Auth, authMiddleware} from '../middleware/authMiddleware';
import type {AuthenticationDomain, GetAuthenticationFn} from '../types';

const d = debug('imperium.auth-server.endpoints.logoutEndpoint');

const {json} = bodyParser;

export function logoutEndpoint(getAuthFn: GetAuthenticationFn, server: ImperiumServer<any>): void {
	const authLogoutUrl = env.getString('IMP_LOGOUT_URL', defaults.IMP_LOGOUT_URL);

	d(`Adding auth logout endpoint: ${authLogoutUrl}`);

	const corsOpts: CorsOptions = {
		origin: getCorsOrigin(),
		credentials: true,
	} as CorsOptions;

	// CORS options
	const corsMiddleware = cors(corsOpts);
	server.expressApp.options(authLogoutUrl, corsMiddleware);

	server.expressApp.post(
		authLogoutUrl,
		corsMiddleware,
		json(),
		authMiddleware({credentialsRequired: true}),
		server.contextMiddleware(),
		async (req, res) => {
			// @ts-ignore
			const auth = req.auth as Auth | null;
			if (auth) {
				if (isLogoutInfo(req.body)) {
					// @ts-ignore
					const authDomain = getAuthFn(req.context) as AuthenticationDomain;

					if (authDomain.onLogout) {
						await authDomain.onLogout(auth.id, req.body);
					}

					res.status(200).end();
				} else {
					res.status(400).end();
				}
			} else {
				res.status(401).end();
			}
		},
	);
}
