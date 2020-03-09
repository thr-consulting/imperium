/* eslint-disable import/no-cycle */
// see: https://github.com/babel/babel/issues/10981
import {IImperiumServer} from '@imperium/server';
import {toString} from '@imperium/util';
import {json} from 'body-parser';
import debug from 'debug';
import {Request, Response} from 'express';
import {ImperiumAuthServerModule} from '../types';

const d = debug('imperium.auth-server.endpoints.forgotPasswordEndpoint');

interface ForgotPasswordInfo {
	email: string;
}

function isForgotPasswordInfo(forgotPasswordInfo: object): forgotPasswordInfo is ForgotPasswordInfo {
	return (forgotPasswordInfo as ForgotPasswordInfo).email !== undefined;
}

export function forgotPasswordEndpoint(authModule: ImperiumAuthServerModule, server: IImperiumServer) {
	d(`Adding auth forgot password endpoint: ${server.environment.authForgotPasswordUrl}`);

	server.expressApp.post(toString(server.environment.authForgotPasswordUrl), json(), (req: Request, res: Response) => {
		if (isForgotPasswordInfo(req.body)) {
			const forgotPasswordInfo = req.body;
			res.send(forgotPasswordInfo.email);
		} else {
			res.send('Not proper');
		}
		res.end();
	});
}
