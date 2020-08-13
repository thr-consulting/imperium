import debug from 'debug';
import {useContext} from 'react';
import {AuthContext, IAuthContext} from './AuthContext';

const d = debug('imperium.auth-client.useAuth');

export function useAuth(): IAuthContext {
	return useContext(AuthContext);
}
