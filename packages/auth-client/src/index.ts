import type {ImperiumClientModule} from '@imperium/client';
import 'whatwg-fetch';
import {withAuth} from './hoc/withAuth';

export function authClientModule(): ImperiumClientModule {
	return {
		name: '@imperium/auth-client',
		hocs: [withAuth],
		environmentDefaults: {
			authAccessTokenKey: 'access', // Key used to store access token on web/app
			authIdKey: 'id', // Key used to store authentication id on web/app
			authRefreshUrl: 'http://localhost:4001/api/refresh', // URL to refresh API
			authLoginUrl: 'http://localhost:4001/api/login', // URL to login API
			authForgotPasswordUrl: 'http://localhost:4001/api/forgot-password', // URL to password refresh API
			authCacheStaleMs: 60000, // MS to keep client auth cached
		},
	};
}

export {useAuth} from './hooks/useAuth';
export {useLazyAuth} from './hooks/useLazyAuth';
export {useAuthId} from './hooks/useAuthId';
export {useForgotPassword} from './hooks/useForgetPassword';
export {useLogin} from './hooks/useLogin';
export {useLogout} from './hooks/useLogout';
export type {LoginInfo, LoginReturn, AccessToken} from './types';
export {isTokenValidOrUndefined, fetchAccessToken} from './lib/fetching';
export type {IAuthContext} from './AuthContext';
