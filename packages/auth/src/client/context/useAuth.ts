import {useContext} from 'react';
import {AuthContext} from '@imperium/context';

export default function useAuth() {
	return useContext(AuthContext);
}
