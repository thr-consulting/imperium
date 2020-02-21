import {IImperiumServer, ImperiumRequest} from '@imperium/server';
import {toString} from '@imperium/util';
import {json} from 'body-parser';
import debug from 'debug';
import {Response} from 'express';
import {ImperiumAuthServerModule} from '../AuthModuleType';
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
						res.status(200).json(ret);
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
