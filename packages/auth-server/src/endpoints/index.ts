import type {ImperiumServer} from '@imperium/server';
import type {GetAuthFn} from '../types';
import {forgotPasswordEndpoint} from './forgotPasswordEndpoint';
import {loginEndpoint} from './loginEndpoint';
import {refreshEndpoint} from './refreshEndpoint';

export function createAuthEndpoints(getAuthFn: GetAuthFn) {
	return function endpoints(server: ImperiumServer<any, any>) {
		loginEndpoint(getAuthFn, server);
		refreshEndpoint(getAuthFn, server);
		forgotPasswordEndpoint(getAuthFn, server);
	};
}
