import type {default as ImperiumServer} from '@imperium/server';
import {toString} from '@imperium/util';
import {json} from 'body-parser';
import cors, {CorsOptions} from 'cors';
import debug from 'debug';
import {environment} from '../environment';
import {login} from '../lib';
import {AuthRequiredDomain, isLoginInfo, LoginReturn} from '../types';

const d = debug('imperium.auth-server.endpoints.loginEndpoint');
const env = environment();

export function loginEndpoint(options: AuthRequiredDomain, server: ImperiumServer<any, any>) {
	d(`Adding auth login endpoint: ${env.authLoginUrl}`);

	const corsOpts: CorsOptions = {
		origin: env.authCorsOrigin,
		credentials: true,
	} as CorsOptions;

	// CORS options
	server.expressApp.options(env.authLoginUrl, cors(corsOpts));

	server.expressApp.post(toString(env.authLoginUrl), cors(corsOpts), json(), server.middleware.contextMiddleware, (req, res) => {
		if (isLoginInfo(req.body)) {
			const loginInfo = req.body;

			// Perform login
			login(loginInfo, options, req.connection.remoteAddress)
				.then((ret: LoginReturn) => {
					// Login was successful, return id and access token and set refresh token as the cookie.
					res
						.status(200)
						// Send refresh token as a cookie to browser
						.cookie(toString(env.authRefreshCookieName), ret.refresh, {
							httpOnly: true,
							secure: env.production, // Secure in production
							expires: new Date(Date.now() + 10 * 60000), // TODO this needs to be the same as env.authRefreshTokenExpires
							domain: toString(env.authServerDomain),
							path: toString(env.authRefreshUrl), // Only set cookie for refresh URL
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
	});
}
