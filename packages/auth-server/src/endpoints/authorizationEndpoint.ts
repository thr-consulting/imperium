import {Authorization} from '@imperium/authorization';
import type {ImperiumServer} from '@imperium/server';
import {Environment, getCorsOrigin} from '@thx/env';
import bodyParser from 'body-parser';
import type {CorsOptions} from 'cors';
import cors from 'cors';
import debug from 'debug';
import {isAuthorizationInfo} from '../lib/typeguards';
import {authMiddleware} from '../middleware/authMiddleware';

const d = debug('imperium.auth-server.endpoints.authorizationEndpoint');

const {json} = bodyParser;

export function authorizationEndpoint(server: ImperiumServer<any>): void {
	const authPermissionUrl = Environment.getString('IMP_PERMISSION_URL');

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
		async (req, res) => {
			if (isAuthorizationInfo(req.body)) {
				// @ts-ignore
				const {context} = req;

				// An assumption is made that you have an authorization field on context, otherwise our endpoint returns false permissions.
				if (context.authorization && context.authorization instanceof Authorization) {
					const results: boolean[] = await Promise.all(
						req.body.permissions.map(async perm => {
							const p = Authorization.stringToKey(perm);
							return context.authorization.can(p.permission, p.data);
						}),
					);

					res.status(200).json({
						results,
					});
				} else {
					// If we don't have an Authorization on context, don't crash, but return false permissions for everything
					d('No authorization field on context, returning false permissions');
					const results = req.body.permissions.map(() => false);
					res.status(200).json({
						results,
					});
				}
			} else {
				res.send(500).end();
			}
		},
	);
}
