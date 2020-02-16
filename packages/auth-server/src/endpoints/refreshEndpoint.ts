import debug from 'debug';
import {IImperiumServer, ImperiumRequest} from '@imperium/server';
import {toString} from '@imperium/util';
import {Response} from 'express';
import {json} from 'body-parser';
import {ImperiumAuthServerModule} from '../types';
import {isRefreshInfo} from '../types';

const d = debug('imperium.auth-server.endpoints.refreshEndpoint');

export function refreshEndpoint(authModule: ImperiumAuthServerModule, server: IImperiumServer) {
	d(`Adding auth refresh endpoint: ${server.environment.authRefreshUrl}`);

	server.expressApp.post(
		toString(server.environment.authRefreshUrl),
		json(),
		// @ts-ignore
		server.middleware.contextManagerMiddleware(),
		(req: ImperiumRequest, res: Response) => {
			if (isRefreshInfo(req.body)) {
				const refreshInfo = req.body;

				// Perform refresh
				req.contextManager.Auth.refresh(refreshInfo, authModule, req, req.contextManager)
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
