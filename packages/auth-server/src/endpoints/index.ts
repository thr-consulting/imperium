import type {ImperiumServer} from '@imperium/server';
import {appLoginEndpoint} from './appLoginEndpoint';
import {authorizationEndpoint} from './authorizationEndpoint';
import {forgotPasswordEndpoint} from './forgotPasswordEndpoint';
import {loginEndpoint} from './loginEndpoint';
import {refreshEndpoint} from './refreshEndpoint';
import type {AuthServerModuleOptions} from '../index';

export function createAuthEndpoints({getAuthFn, enableAppLogin}: AuthServerModuleOptions) {
	return async function endpoints(server: ImperiumServer<any>): Promise<void> {
		loginEndpoint(getAuthFn, server);
		if (enableAppLogin) {
			appLoginEndpoint(getAuthFn, server);
		}
		refreshEndpoint(getAuthFn, server);
		forgotPasswordEndpoint(getAuthFn, server);
		authorizationEndpoint(server);
	};
}
