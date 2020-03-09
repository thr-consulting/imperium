/* eslint-disable import/no-cycle */
// see: https://github.com/babel/babel/issues/10981
import {IImperiumServer, ImperiumRequest} from '@imperium/server';
import {toString} from '@imperium/util';
import debug from 'debug';
import {Response} from 'express';
import cookieParser from 'cookie-parser';
import cors, {CorsOptions} from 'cors';
import {ImperiumAuthServerModule, AuthContextManager} from '../types';

const d = debug('imperium.auth-server.endpoints.refreshEndpoint');

export function refreshEndpoint(authModule: ImperiumAuthServerModule, server: IImperiumServer) {
	d(`Adding auth refresh endpoint: ${server.environment.authRefreshUrl}`);

	const corsOpts: CorsOptions = {
		origin: server.environment.authCorsOrigin,
		credentials: true,
	} as CorsOptions;

	// CORS options
	server.expressApp.options(toString(server.environment.authRefreshUrl), cors(corsOpts));

	server.expressApp.post(
		toString(server.environment.authRefreshUrl),
		cors(corsOpts),
		cookieParser(),
		// @ts-ignore
		server.middleware.contextManagerMiddleware(),
		(req: ImperiumRequest<AuthContextManager>, res: Response) => {
			if (req.cookies && req.cookies[toString(server.environment.authRefreshCookieName)]) {
				const refreshTokenString = req.cookies[toString(server.environment.authRefreshCookieName)];

				// Perform refresh
				req.contextManager.Auth.refresh(refreshTokenString, authModule, req, req.contextManager)
					.then((ret: any) => {
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
		},
	);
}
