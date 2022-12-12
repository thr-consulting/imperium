import type {ImperiumServer} from '@imperium/server';
import {env, getCorsOrigin} from '@thx/env';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors, {CorsOptions} from 'cors';
import debug from 'debug';
import {defaults} from '../defaults';
import {refresh} from '../lib/refresh';
import type {GetAuthenticationFn} from '../types';

const d = debug('imperium.auth-server.endpoints.refreshEndpoint');

const {json} = bodyParser;

export function refreshEndpoint(getAuthFn: GetAuthenticationFn, server: ImperiumServer<any>): void {
	const authRefreshUrl = env.getString('IMP_REFRESH_URL', defaults.IMP_REFRESH_URL);
	const authRefreshCookieName = env.getString('IMP_REFRESH_COOKIE_NAME', defaults.IMP_REFRESH_COOKIE_NAME);

	d(`Adding auth refresh endpoint: ${authRefreshUrl}`);

	const corsOpts: CorsOptions = {
		origin: getCorsOrigin(),
		credentials: true,
	};

	// CORS options
	const corsMiddleware = cors(corsOpts);
	server.expressApp.options(authRefreshUrl, corsMiddleware);

	server.expressApp.post(authRefreshUrl, cors(corsOpts), cookieParser(), json(), server.contextMiddleware(), (req, res) => {
		const refreshTokenString = req.cookies && req.cookies[authRefreshCookieName] ? req.cookies[authRefreshCookieName] : req.body.refresh;
		if (refreshTokenString) {
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
