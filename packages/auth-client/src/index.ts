import type {ImperiumClientModule} from '@imperium/client';
import type {ImperiumStateClientModule} from '@imperium/state';
import {withAuth} from './hoc/withAuth';
import {authenticatedState, tokenState} from './state';
import type {AuthClientOptions} from './types';

export function authClientModule(opts?: AuthClientOptions): ImperiumClientModule & ImperiumStateClientModule {
	return {
		name: '@imperium/auth-client',
		order: 20,
		hocs: [withAuth(opts)],
		state: [authenticatedState, tokenState],
	};
}

export {useAuthenticatedState, renewToken, setAuthenticated} from './state';
export {useAccessToken} from './hooks/useAccessToken';
export {useLogin} from './hooks/useLogin';
export {useLogout} from './hooks/useLogout';
export {useCan} from './hooks/useCan';
export {useFetch} from './hooks/useFetch';
export {useAuthorization} from './hooks/useAuthorization';
export {authorizationEndpointLookup} from './lib/authorizationEndpointLookup';
export {authorizationHeader} from './lib/authorizationHeader';
export type {LoginInfo, LoginReturn, Token} from './types';
export {isTokenValidOrUndefined} from './lib/isTokenValidOrUndefined';
export {fetchAccessToken} from './lib/fetchAccessToken';
