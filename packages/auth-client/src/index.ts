import 'whatwg-fetch';
import type {ImperiumClientModule} from '@imperium/client';
import {withAuth} from './hoc/withAuth';

export function authClientModule(): ImperiumClientModule {
	return {
		name: '@imperium/auth-client',
		hocs: [withAuth],
	};
}

export {useAuth} from './hooks/useAuth';
export {useLazyAuth} from './hooks/useLazyAuth';
export {useAuthId} from './hooks/useAuthId';
export {useForgetPassword} from './hooks/useForgetPassword';
export {useLogin} from './hooks/useLogin';
export {useLogout} from './hooks/useLogout';
export type {LoginInfo, LoginReturn, AccessToken} from './types';
export {isTokenValidOrUndefined, fetchAccessToken} from './lib/fetching';
export type {IAuthContext} from './AuthContext';
