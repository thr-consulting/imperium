import type {ImperiumServer} from '@imperium/server';
import {env, getCorsOrigin} from '@thx/env';
import bodyParser from 'body-parser';
import cors, {CorsOptions} from 'cors';
import debug from 'debug';
import {defaults} from '../defaults';
import {login} from '../lib/login';
import {isLoginInfo} from '../lib/typeguards';
import type {GetAuthenticationFn, LoginReturn} from '../types';

const d = debug('imperium.auth-server.endpoints.appLoginEndpoint');

const {json} = bodyParser;

export function appLoginEndpoint(getAuthFn: GetAuthenticationFn, server: ImperiumServer<any>): void {
	const authAppLoginUrl = env.getString('IMP_LOGIN_APP_URL', defaults.IMP_LOGIN_APP_URL);

	d(`Adding auth app login endpoint: ${authAppLoginUrl}`);

	const corsOpts: CorsOptions = {
		origin: getCorsOrigin(),
		credentials: true,
	} as CorsOptions;

	// CORS options
	const corsMiddleware = cors(corsOpts);
	server.expressApp.options(authAppLoginUrl, corsMiddleware);

	server.expressApp.post(authAppLoginUrl, corsMiddleware, json(), server.contextMiddleware(), (req, res) => {
		if (isLoginInfo(req.body)) {
			const loginInfo = req.body;

			d(`Login attempt: ${loginInfo.identifier}`);

			// @ts-ignore
			const auth = getAuthFn(req.context);

			// @ts-ignore Perform login
			login(loginInfo, req.socket.remoteAddress, auth)
				.then((ret: LoginReturn) => {
					// Login was successful, return id, access, and refresh token

					res
						.status(200)
						// Send user id and initial access token and refresh token
						.json({
							id: ret.id,
							access: ret.access,
							refresh: ret.refresh,
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
