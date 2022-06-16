import type {ImperiumClientModule} from '@imperium/client';
import {AuthClientOptions, withAuth} from './hoc/withAuth';

export function authClientModule(opts?: AuthClientOptions): ImperiumClientModule {
	const hoc = withAuth(opts);

	return {
		name: '@imperium/auth-client',
		order: 20,
		hocs: [hoc],
	};
}

export {useForgotPassword} from './hooks/useForgetPassword';
export {useLogin} from './hooks/useLogin';
export {useLogout} from './hooks/useLogout';
export type {LoginInfo, LoginReturn, AccessToken} from './types';
export {isTokenValidOrUndefined, fetchAccessToken} from './lib/storage';
export type {IAuthContext} from './AuthContext';
export {useAuth} from './hooks/useAuth';
export {useCan} from './hooks/useCan';
export {authorizationEndpointLookup} from './lib/authorizationEndpointLookup';
export {authorizationHeader} from './lib/authorizationHeader';
export {fetch} from './lib/fetch';
export {useFetch} from './hooks/useFetch';
