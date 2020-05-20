import type {ImperiumServer} from '@imperium/server';
import type {GetAuthFn} from '../types';
import {forgotPasswordEndpoint} from './forgotPasswordEndpoint';
import {loginEndpoint} from './loginEndpoint';
import {refreshEndpoint} from './refreshEndpoint';

export function createAuthEndpoints<C>(getAuthFn: GetAuthFn<C>) {
	return function endpoints(server: ImperiumServer<C, any>) {
		loginEndpoint(getAuthFn, server);
		refreshEndpoint(getAuthFn, server);
		forgotPasswordEndpoint(getAuthFn, server);
	};
}
