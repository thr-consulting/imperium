import type {ImperiumServer} from '@imperium/server';
import {json} from 'body-parser';
import cors, {CorsOptions} from 'cors';
import debug from 'debug';
import ms from 'ms';
import {environment} from '../environment';
import {login} from '../lib/login';
import {isLoginInfo} from '../lib/typeguards';
import type {GetAuthenticationFn, LoginReturn} from '../types';

const d = debug('imperium.auth-server.endpoints.loginEndpoint');
const env = environment();

export function loginEndpoint(getAuthFn: GetAuthenticationFn, server: ImperiumServer<any>): void {
	d(`Adding auth login endpoint: ${env.authLoginUrl}`);

	const corsOpts: CorsOptions = {
		origin: env.authCorsOrigin,
		credentials: true,
	} as CorsOptions;

	// CORS options
	server.expressApp.options(env.authLoginUrl, cors(corsOpts));

	server.expressApp.post(env.authLoginUrl, cors(corsOpts), json(), server.contextMiddleware(), (req, res) => {
		if (isLoginInfo(req.body)) {
			const loginInfo = req.body;

			d(`Login attempt: ${loginInfo.identifier}`);

			// @ts-ignore
			const auth = getAuthFn(req.context);

			// @ts-ignore Perform login
			login(loginInfo, req.connection.remoteAddress, auth)
				.then((ret: LoginReturn) => {
					// Login was successful, return id and access token and set refresh token as the cookie.
					const expires = loginInfo.rememberDevice
						? new Date(Date.now() + ms(env.authRefreshTokenExpiresLong))
						: new Date(Date.now() + ms(env.authRefreshTokenExpiresShort));

					res
						.status(200)
						// Send refresh token as a cookie to browser
						.cookie(env.authRefreshCookieName, ret.refresh, {
							httpOnly: true,
							secure: env.production, // Secure in production
							expires,
							domain: env.authServerDomain,
							path: env.authRefreshUrl, // Only set cookie for refresh URL
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
