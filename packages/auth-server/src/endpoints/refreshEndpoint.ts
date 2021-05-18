import type {ImperiumServer} from '@imperium/server';
import {Environment, getCorsOrigin} from '@thx/env';
import cookieParser from 'cookie-parser';
import cors, {CorsOptions} from 'cors';
import debug from 'debug';
import {refresh} from '../lib/refresh';
import type {GetAuthenticationFn} from '../types';

const d = debug('imperium.auth-server.endpoints.refreshEndpoint');

export function refreshEndpoint(getAuthFn: GetAuthenticationFn, server: ImperiumServer<any>): void {
	const authRefreshUrl = Environment.getString('AUTH_REFRESH_URL');
	const authRefreshCookieName = Environment.getString('AUTH_REFRESH_COOKIE_NAME');

	d(`Adding auth refresh endpoint: ${authRefreshUrl}`);

	const corsOpts: CorsOptions = {
		origin: getCorsOrigin(),
		credentials: true,
	};

	// CORS options
	const corsMiddleware = cors(corsOpts);
	server.expressApp.options(authRefreshUrl, corsMiddleware);

	server.expressApp.post(authRefreshUrl, cors(corsOpts), cookieParser(), server.contextMiddleware(), (req, res) => {
		if (req.cookies && req.cookies[authRefreshCookieName]) {
			const refreshTokenString = req.cookies[authRefreshCookieName];

			// @ts-ignore
			const auth = getAuthFn(req.context);

			// @ts-ignore Perform refresh
			refresh(refreshTokenString, auth, req.context)
				.then((ret: {access: string}) => {
					res.status(200).json(ret);
					res.end();
				})
				.catch((err: Error) => {
					res.status(400).send(err.toString());
					res.end();
				});
		} else {
			res.status(400).send('Invalid refresh token');
			res.end();
		}
	});
}
