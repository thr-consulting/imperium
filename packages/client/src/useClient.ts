import {useContext} from 'react';
import {ClientContext} from './ClientContext';
import type {ImperiumClient} from './ImperiumClient';

export function useClient(): ImperiumClient | null {
	return useContext(ClientContext);
}
