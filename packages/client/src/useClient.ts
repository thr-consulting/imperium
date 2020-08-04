import {useContext} from 'react';
import {ClientContext} from './ClientContext';
import type {IImperiumClient} from './types';

export function useClient(): IImperiumClient | null {
	return useContext(ClientContext);
}
