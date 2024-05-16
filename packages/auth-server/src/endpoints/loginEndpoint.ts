import type {ImperiumServer} from '@imperium/server';
import {env, getCorsOrigin} from '@thx/env';
import bodyParser from 'body-parser';
import cors, {CorsOptions} from 'cors';
import debug from 'debug';
import ms from 'ms';
import {defaults} from '../defaults';
import {login} from '../lib/login';
import {isLoginInfo} from '../lib/typeguards';
import type {GetAuthenticationFn, LoginReturn} from '../types';

const d = debug('imperium.auth-server.endpoints.loginEndpoint');

const {json} = bodyParser;

export function loginEndpoint(getAuthFn: GetAuthenticationFn, server: ImperiumServer<any>): void {
	const authLoginUrl = env.getString('IMP_LOGIN_URL', defaults.IMP_LOGIN_URL);
	const authRefreshTokenExpiresLong = env.getString('IMP_REFRESH_TOKEN_EXPIRES_LONG', defaults.IMP_REFRESH_TOKEN_EXPIRES_LONG);
	const authRefreshTokenExpiresShort = env.getString('IMP_REFRESH_TOKEN_EXPIRES_SHORT', defaults.IMP_REFRESH_TOKEN_EXPIRES_SHORT);
	const authRefreshCookieName = env.getString('IMP_REFRESH_COOKIE_NAME', defaults.IMP_REFRESH_COOKIE_NAME);
	const secure = env.isProduction();
	const authServerDomain = env.getString('IMP_AUTH_DOMAIN', defaults.IMP_AUTH_DOMAIN);
	const authRefreshUrl = env.getString('IMP_REFRESH_URL', defaults.IMP_REFRESH_URL);

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
			login(loginInfo, req.socket.remoteAddress, auth)
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
							customData: ret.customData,
						});
					res.end();
				})
				.catch((err: Error) => {
					res.status(500).send(err.toString());
					res.end();
				});
		} else {
			res.status(400).send('Invalid JSON body');
			res.end();
		}
	});
}
