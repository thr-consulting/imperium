import 'whatwg-fetch';
import type {ImperiumClientModule} from '@imperium/client';
import {withAuth} from './withAuth';

export function authClientModule(): ImperiumClientModule {
	return {
		name: '@imperium/auth-client',
		hocs: [withAuth],
	};
}

export {useAuth} from './useAuth';
export {useLazyAuth} from './useLazyAuth';
export {useAuthId} from './useAuthId';
export {useForgetPassword} from './useForgetPassword';
export {useLogin} from './useLogin';
export {useLogout} from './useLogout';
export type {LoginInfo, LoginReturn, AccessToken} from './types';
export {AbstractAuthSelector} from './AbstractAuthSelector';
export {isTokenValidOrUndefined, fetchAccessToken} from './lib';
export {AuthLevel} from './AuthLevel';
export type {IAuthContext} from './AuthContext';
