import type {default as ImperiumServer} from '@imperium/server';
import {toString} from '@imperium/util';
import {json} from 'body-parser';
import debug from 'debug';
import {environment} from '../environment';
import type {AuthRequiredDomain} from '../types';

const d = debug('imperium.auth-server.endpoints.forgotPasswordEndpoint');
const env = environment();

interface ForgotPasswordInfo {
	email: string;
}

function isForgotPasswordInfo(forgotPasswordInfo: object): forgotPasswordInfo is ForgotPasswordInfo {
	return (forgotPasswordInfo as ForgotPasswordInfo).email !== undefined;
}

export function forgotPasswordEndpoint(options: AuthRequiredDomain, server: ImperiumServer<any, any>) {
	d(`Adding auth forgot password endpoint: ${env.authForgotPasswordUrl}`);

	server.expressApp.post(toString(env.authForgotPasswordUrl), json(), (req, res) => {
		if (isForgotPasswordInfo(req.body)) {
			const forgotPasswordInfo = req.body;
			res.send(forgotPasswordInfo.email);
		} else {
			res.send('Not proper');
		}
		res.end();
	});
}
