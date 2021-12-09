import type {ImperiumServer} from '@imperium/server';
import type {GetAuthenticationFn} from '../types';
import {forgotPasswordEndpoint} from './forgotPasswordEndpoint';
import {loginEndpoint} from './loginEndpoint';
import {refreshEndpoint} from './refreshEndpoint';
import {authorizationEndpoint} from './authorizationEndpoint';

export function createAuthEndpoints(getAuthFn: GetAuthenticationFn) {
	return async function endpoints(server: ImperiumServer<any>): Promise<void> {
		loginEndpoint(getAuthFn, server);
		refreshEndpoint(getAuthFn, server);
		forgotPasswordEndpoint(getAuthFn, server);
		authorizationEndpoint(server);
	};
}
