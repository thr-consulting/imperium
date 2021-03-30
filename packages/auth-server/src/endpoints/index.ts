import type {ImperiumServer} from '@imperium/server';
import type {GetAuthenticationFn} from '../types';
import {forgotPasswordEndpoint} from './forgotPasswordEndpoint';
import {loginEndpoint} from './loginEndpoint';
import {refreshEndpoint} from './refreshEndpoint';

export function createAuthEndpoints(getAuthFn: GetAuthenticationFn) {
	return function endpoints(server: ImperiumServer<any>): void {
		loginEndpoint(getAuthFn, server);
		refreshEndpoint(getAuthFn, server);
		forgotPasswordEndpoint(getAuthFn, server);
	};
}
