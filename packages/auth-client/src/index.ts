import type {ImperiumClientModule} from '@imperium/client';
import {AuthClientOptions, withAuth} from './hoc/withAuth';

export function authClientModule(opts?: AuthClientOptions): ImperiumClientModule {
	const hoc = withAuth(opts);

	return {
		name: '@imperium/auth-client',
		order: 20,
		hocs: [hoc],
		environmentDefaults: {
			authAccessTokenKey: 'access', // Key used to store access token on web/app
			authIdKey: 'id', // Key used to store authentication id on web/app
			authRefreshUrl: 'http://localhost:4001/api/refresh', // URL to refresh API
			authLoginUrl: 'http://localhost:4001/api/login', // URL to login API
			authPermissionUrl: 'http://localhost:4001/api/auth', // URL to permission API
			authForgotPasswordUrl: 'http://localhost:4001/api/forgot-password', // URL to password refresh API
		},
	};
}

export {useForgotPassword} from './hooks/useForgetPassword';
export {useLogin} from './hooks/useLogin';
export {useLogout} from './hooks/useLogout';
export type {LoginInfo, LoginReturn, AccessToken} from './types';
export {isTokenValidOrUndefined, fetchAccessToken} from './lib/fetching';
export type {IAuthContext} from './AuthContext';
export {useAuth} from './hooks/useAuth';
export {useCan} from './hooks/useCan';
export {authorizationEndpointLookup} from './lib/authorizationEndpointLookup';
