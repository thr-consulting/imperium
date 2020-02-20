import debug from 'debug';
import {useContext} from 'react';
import {AuthContext} from './AuthContext';

const d = debug('imperium.auth-client.useLogout');

export function useLogout() {
	const authContext = useContext(AuthContext);

	return () => {
		localStorage.removeItem('id');
		localStorage.removeItem('access');
		authContext.setAuth(null);
	};
}
