import debug from 'debug';
import {useContext} from 'react';
import {useClient} from '@imperium/client';
import {AuthContext} from './AuthContext';

const d = debug('imperium.auth-client.useLogout');

export function useLogout() {
	const authContext = useContext(AuthContext);
	const client = useClient();

	return () => {
		localStorage.removeItem(client?.globalConst.authLSIdKey as string);
		localStorage.removeItem(client?.globalConst.authLSAccessTokenKey as string);
		authContext.setAuth(null);

		// TODO This should also tell the server to blacklist the refresh token
	};
}
