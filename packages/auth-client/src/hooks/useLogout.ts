import {Environment} from '@thx/env';
import debug from 'debug';
import {useContext} from 'react';
import {AuthContext} from '../AuthContext';

const d = debug('imperium.auth-client.hooks.useLogout');

export function useLogout(): () => Promise<void> {
	const {setAuthenticated} = useContext(AuthContext);

	return async () => {
		d('Logging out');
		localStorage.removeItem(Environment.getString('authIdKey'));
		localStorage.removeItem(Environment.getString('authAccessTokenKey'));
		setAuthenticated({id: '', access: ''});
		// todo await authContext.clearCache();

		// TODO This should also tell the server to blacklist the refresh token
	};
}
