import debug from 'debug';
import {IImperiumServer, ImperiumRequest} from '@imperium/server';
import {toString} from '@imperium/util';
import {Response} from 'express';
import {json} from 'body-parser';
import {ImperiumAuthServerModule} from '../types';
import {isLoginInfo} from '../types';

const d = debug('imperium.auth-server.endpoints.loginEndpoint');

export function loginEndpoint(authModule: ImperiumAuthServerModule, server: IImperiumServer) {
	d(`Adding auth login endpoint: ${server.environment.authLoginUrl}`);

	server.expressApp.post(
		toString(server.environment.authLoginUrl),
		json(),
		// @ts-ignore
		server.middleware.contextManagerMiddleware(),
		(req: ImperiumRequest, res: Response) => {
			if (isLoginInfo(req.body)) {
				const loginInfo = req.body;

				// Perform login
				req.contextManager.Auth.login(loginInfo, authModule, req, req.contextManager)
					.then((ret: any) => {
						res.json(ret);
						res.end();
					})
					.catch((err: Error) => {
						res.send(err.toString());
						res.end();
					});
			} else {
				res.send('Invalid JSON body');
				res.end();
			}
		},
	);
}
