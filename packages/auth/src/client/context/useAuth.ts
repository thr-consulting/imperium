import {useContext} from 'react';
import {AuthContext} from '@imperium/context';
import {ClientAuth} from '../../types';

interface UseAuth extends ClientAuth {
	setUser: (user: ClientAuth) => void,
}

export default function useAuth(): UseAuth {
	return useContext(AuthContext);
}
