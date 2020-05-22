import type {ImperiumServer} from '@imperium/server';
import cookieParser from 'cookie-parser';
import cors, {CorsOptions} from 'cors';
import debug from 'debug';
import {environment} from '../environment';
import {refresh} from '../lib';
import type {GetAuthFn} from '../types';

const d = debug('imperium.auth-server.endpoints.refreshEndpoint');
const env = environment();

export function refreshEndpoint(getAuthFn: GetAuthFn, server: ImperiumServer<any, any>) {
	d(`Adding auth refresh endpoint: ${env.authRefreshUrl}`);

	const corsOpts: CorsOptions = {
		origin: env.authCorsOrigin,
		credentials: true,
	};

	// CORS options
	server.expressApp.options(env.authRefreshUrl, cors(corsOpts));

	server.expressApp.post(env.authRefreshUrl, cors(corsOpts), cookieParser(), server.contextMiddleware(), (req, res) => {
		if (req.cookies && req.cookies[env.authRefreshCookieName]) {
			const refreshTokenString = req.cookies[env.authRefreshCookieName];

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
