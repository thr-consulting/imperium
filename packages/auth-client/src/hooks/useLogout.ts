import {env} from '@thx/env';
import debug from 'debug';
import {useContext} from 'react';
import {AuthContext} from '../AuthContext';
import {defaults} from '../defaults';

const d = debug('imperium.auth-client.hooks.useLogout');

export function useLogout(): () => Promise<void> {
	const {setAuthenticated, clearCache} = useContext(AuthContext);

	return async () => {
		d('Logging out');
		localStorage.removeItem(env.getString('authIdKey', defaults.authIdKey));
		localStorage.removeItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey));
		setAuthenticated({id: '', access: ''});
		// Clear permission cache
		await clearCache();

		// TODO This should also tell the server to blacklist the refresh token
	};
}
