import debug from 'debug';
import {useContext} from 'react';
import {useClient} from '@imperium/client';
import {AuthContext} from './AuthContext';
import {environment} from './environment';

const d = debug('imperium.auth-client.useLogout');

export function useLogout(): () => Promise<void> {
	const authContext = useContext(AuthContext);
	const client = useClient();

	const env = environment(client?.environment);

	return async () => {
		d('Logging out');
		localStorage.removeItem(env.localStorageIdKey);
		localStorage.removeItem(env.localStorageAccessTokenKey);
		authContext.setAuth(null);
		return authContext.clearCache();

		// TODO This should also tell the server to blacklist the refresh token
	};
}
