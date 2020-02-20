import {useContext} from 'react';
import {ClientContext} from './ClientContext';

export function useClient() {
	return useContext(ClientContext);
}
