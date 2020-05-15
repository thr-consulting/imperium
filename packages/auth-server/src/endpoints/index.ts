import type {ImperiumServer} from '@imperium/server';
import type {AuthRequiredDomain} from '../types';
import {forgotPasswordEndpoint} from './forgotPasswordEndpoint';
import {loginEndpoint} from './loginEndpoint';
import {refreshEndpoint} from './refreshEndpoint';

export function createAuthEndpoints(options: AuthRequiredDomain) {
	return function endpoints(server: ImperiumServer<any, any>) {
		loginEndpoint(options, server);
		refreshEndpoint(options, server);
		forgotPasswordEndpoint(options, server);
	};
}
