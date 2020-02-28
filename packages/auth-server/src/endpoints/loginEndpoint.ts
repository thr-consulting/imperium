import debug from 'debug';
import {IImperiumServer, ImperiumRequest} from '@imperium/server';
import {toString} from '@imperium/util';
import {Response} from 'express';
import {json} from 'body-parser';
import cors, {CorsOptions} from 'cors';
import {ImperiumAuthServerModule, isLoginInfo, LoginReturn} from '../types';

const d = debug('imperium.auth-server.endpoints.loginEndpoint');

export function loginEndpoint(authModule: ImperiumAuthServerModule, server: IImperiumServer) {
	d(`Adding auth login endpoint: ${server.environment.authLoginUrl}`);

	const corsOpts: CorsOptions = {
		origin: server.environment.authCorsOrigin,
		credentials: true,
	} as CorsOptions;

	// CORS options
	server.expressApp.options(toString(server.environment.authLoginUrl), cors(corsOpts));

	server.expressApp.post(
		toString(server.environment.authLoginUrl),
		cors(corsOpts),
		json(),
		// @ts-ignore
		server.middleware.contextManagerMiddleware(),
		(req: ImperiumRequest, res: Response) => {
			if (isLoginInfo(req.body)) {
				const loginInfo = req.body;

				// Perform login
				req.contextManager.Auth.login(loginInfo, authModule, req, req.contextManager)
					.then((ret: LoginReturn) => {
						// Login was successful, return id and access token and set refresh token as the cookie.
						res
							.status(200)
							// Send refresh token as a cookie to browser
							.cookie(toString(server.environment.authRefreshCookieName), ret.refresh, {
								httpOnly: true,
								secure: server.environment.production as boolean, // Secure in production
								expires: new Date(Date.now() + 10 * 60000), // TODO this needs to be the same as environment.authRefreshTokenExpires
								domain: toString(server.environment.authServerDomain),
								path: toString(server.environment.authRefreshUrl), // Only set cookie for refresh URL
							})
							// Send user id and initial access token
							.json({
								id: ret.id,
								access: ret.access,
							});
						res.end();
					})
					.catch((err: Error) => {
						res.status(400).send(err.toString());
						res.end();
					});
			} else {
				res.status(400).send('Invalid JSON body');
				res.end();
			}
		},
	);
}
