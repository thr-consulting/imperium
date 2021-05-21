import type {ImperiumServer} from '@imperium/server';
import {Environment, getCorsOrigin} from '@thx/env';
import {json} from 'body-parser';
import cors, {CorsOptions} from 'cors';
import debug from 'debug';
import ms from 'ms';
import {login} from '../lib/login';
import {isLoginInfo} from '../lib/typeguards';
import type {GetAuthenticationFn, LoginReturn} from '../types';

const d = debug('imperium.auth-server.endpoints.loginEndpoint');

export function loginEndpoint(getAuthFn: GetAuthenticationFn, server: ImperiumServer<any>): void {
	const authLoginUrl = Environment.getString('AUTH_LOGIN_URL');
	const authRefreshTokenExpiresLong = Environment.getString('AUTH_REFRESH_TOKEN_EXPIRES_LONG');
	const authRefreshTokenExpiresShort = Environment.getString('AUTH_REFRESH_TOKEN_EXPIRES_SHORT');
	const authRefreshCookieName = Environment.getString('AUTH_REFRESH_COOKIE_NAME');
	const secure = Environment.getString('NODE_ENV') === 'production';
	const authServerDomain = Environment.getString('AUTH_SERVER_DOMAIN');
	const authRefreshUrl = Environment.getString('AUTH_REFRESH_URL');

	d(`Adding auth login endpoint: ${authLoginUrl}`);

	const corsOpts: CorsOptions = {
		origin: getCorsOrigin(),
		credentials: true,
	} as CorsOptions;

	// CORS options
	const corsMiddleware = cors(corsOpts);
	server.expressApp.options(authLoginUrl, corsMiddleware);

	server.expressApp.post(authLoginUrl, corsMiddleware, json(), server.contextMiddleware(), (req, res) => {
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
						? new Date(Date.now() + ms(authRefreshTokenExpiresLong))
						: new Date(Date.now() + ms(authRefreshTokenExpiresShort));

					res
						.status(200)
						// Send refresh token as a cookie to browser
						.cookie(authRefreshCookieName, ret.refresh, {
							httpOnly: true,
							secure, // Secure in production
							expires,
							domain: authServerDomain,
							path: authRefreshUrl, // Only set cookie for refresh URL
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
