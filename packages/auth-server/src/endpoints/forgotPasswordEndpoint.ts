import type {ImperiumServer} from '@imperium/server';
import {env} from '@thx/env';
import bodyParser from 'body-parser';
import debug from 'debug';
import {defaults} from '../defaults';
import type {GetAuthenticationFn} from '../types';

const d = debug('imperium.auth-server.endpoints.forgotPasswordEndpoint');

const {json} = bodyParser;

interface ForgotPasswordInfo {
	email: string;
}

function isForgotPasswordInfo(forgotPasswordInfo: any): forgotPasswordInfo is ForgotPasswordInfo {
	return (forgotPasswordInfo as ForgotPasswordInfo).email !== undefined;
}

export function forgotPasswordEndpoint(getAuthFn: GetAuthenticationFn, server: ImperiumServer<any>): void {
	const authForgotPasswordUrl = env.getString('IMP_RESET_URL', defaults.IMP_RESET_URL);

	d(`Adding auth forgot password endpoint: ${authForgotPasswordUrl}`);

	server.expressApp.post(authForgotPasswordUrl, json(), (req, res) => {
		if (isForgotPasswordInfo(req.body)) {
			const forgotPasswordInfo = req.body;
			res.send(forgotPasswordInfo.email);
		} else {
			res.send('Not proper');
		}
		res.end();
	});
}
