import {useContext} from 'react';
import {AuthContext} from '../AuthContext';

/**
 * Returns the current Authorization instance
 */
export function useAuthorization() {
	const {authorization} = useContext(AuthContext);
	return authorization;
}
