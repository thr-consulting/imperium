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
export {useForgetPassword} from './useForgetPassword';
export {useLogin} from './useLogin';
export {useLogout} from './useLogout';
export {LoginInfo, LoginReturn, AccessToken} from './types';
export {isTokenValidOrUndefined, fetchAccessToken} from './lib';
