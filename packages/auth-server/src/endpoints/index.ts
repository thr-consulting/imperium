import type {IImperiumServer, ImperiumServerModule} from '@imperium/server';
import type {AuthRequiredDomain, ImperiumAuthServerModule} from '../types';
import {forgotPasswordEndpoint} from './forgotPasswordEndpoint';
import {loginEndpoint} from './loginEndpoint';
import {refreshEndpoint} from './refreshEndpoint';

export function createAuthEndpoints(options: AuthRequiredDomain) {
	return function endpoints(server: IImperiumServer) {
		const authModules = server.modules.reduce((memo, module: ImperiumServerModule<any, any> & ImperiumAuthServerModule) => {
			if (module.auth) {
				return [...memo, module];
			}
			return memo;
		}, [] as ImperiumAuthServerModule[]);

		if (authModules.length !== 1) {
			throw new Error(`Exactly 1 module must provide ImperiumAuthServerModule features. ${authModules.length} module(s) found.`);
		}

		loginEndpoint(authModules[0], server);
		refreshEndpoint(authModules[0], server);
		forgotPasswordEndpoint(authModules[0], server);
	};
}
