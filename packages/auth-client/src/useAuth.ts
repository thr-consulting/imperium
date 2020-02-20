import debug from 'debug';
import {useContext} from 'react';
import {AuthContext} from './AuthContext';

const d = debug('imperium.auth-client.useAuth');

export function useAuth() {
	return useContext(AuthContext);
}
