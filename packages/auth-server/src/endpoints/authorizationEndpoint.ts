import type {ImperiumServer} from '@imperium/server';
import {Environment, getCorsOrigin} from '@thx/env';
import {Authorization} from '@imperium/authorization';
import type {CorsOptions} from 'cors';
import cors from 'cors';
import {json} from 'body-parser';
import debug from 'debug';
import {authMiddleware} from '../middleware/authMiddleware';
import {isAuthorizationInfo} from '../lib/typeguards';

const d = debug('imperium.auth-server.endpoints.authorizationEndpoint');

export function authorizationEndpoint(server: ImperiumServer<any>): void {
	const authPermissionUrl = Environment.getString('AUTH_PERMISSION_URL');

	d(`Adding auth permission endpoint: ${authPermissionUrl}`);

	const corsOpts: CorsOptions = {
		origin: getCorsOrigin(),
		credentials: true,
	} as CorsOptions;

	// CORS options
	const corsMiddleware = cors(corsOpts);
	server.expressApp.options(authPermissionUrl, corsMiddleware);

	server.expressApp.post(
		authPermissionUrl,
		corsMiddleware,
		json(),
		authMiddleware({credentialsRequired: false}),
		server.contextMiddleware(),
		(req, res) => {
			if (isAuthorizationInfo(req.body)) {
				// @ts-ignore
				const {context} = req;
				// An assumption is made that you have an authorization field on context, otherwise our endpoint fails.
				if (context.authorization && context.authorization instanceof Authorization) {
					context.authorization.can(req.body.permission, req.body.data).then((result: boolean) => {
						res.status(200).json({ret: result});
					});
				} else {
					res.send(500).end();
				}
			} else {
				res.send(500).end();
			}
		},
	);
}
