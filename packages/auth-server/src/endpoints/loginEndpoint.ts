import type {ImperiumServer} from '@imperium/server';
import {json} from 'body-parser';
import cors, {CorsOptions} from 'cors';
import debug from 'debug';
import ms from 'ms';
import {environment} from '../environment';
import {login} from '../lib';
import {isLoginInfo} from '../lib/typeguards';
import type {GetAuthFn, LoginReturn} from '../types';

const d = debug('imperium.auth-server.endpoints.loginEndpoint');
const env = environment();

export function loginEndpoint(getAuthFn: GetAuthFn, server: ImperiumServer<any, any>) {
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

			// @ts-ignore
			const auth = getAuthFn(req.context);

			// TODO Researching getting additional info from the request. Maybe we should keep track of that info?
			// d(req.hostname);
			// d(req.ip);
			// d(req.ips);

			// @ts-ignore Perform login
			login(loginInfo, req.connection.remoteAddress, auth)
				.then((ret: LoginReturn) => {
					// Login was successful, return id and access token and set refresh token as the cookie.
					const expires = loginInfo.rememberDevice ? new Date(ms(env.authRefreshTokenExpiresLong)) : new Date(ms(env.authRefreshTokenExpiresShort));

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
