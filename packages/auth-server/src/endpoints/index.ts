import type {ImperiumServer} from '@imperium/server';
import type {GetAuthenticationFn} from '../types';
import {appLoginEndpoint} from './appLoginEndpoint';
import {authorizationEndpoint} from './authorizationEndpoint';
import {forgotPasswordEndpoint} from './forgotPasswordEndpoint';
import {loginEndpoint} from './loginEndpoint';
import {refreshEndpoint} from './refreshEndpoint';

export function createAuthEndpoints(getAuthFn: GetAuthenticationFn) {
	return async function endpoints(server: ImperiumServer<any>): Promise<void> {
		loginEndpoint(getAuthFn, server);
		appLoginEndpoint(getAuthFn, server);
		refreshEndpoint(getAuthFn, server);
		forgotPasswordEndpoint(getAuthFn, server);
		authorizationEndpoint(server);
	};
}
