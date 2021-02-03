import debug from 'debug';
import {useContext} from 'react';
import {AuthContext} from './AuthContext';

const d = debug('imperium.auth-client.useAuthId');

export function useAuthId() {
	const ctx = useContext(AuthContext);
	return {
		id: ctx.auth?.id,
		access: ctx.auth?.access,
		setAuth: ctx.setAuth,
		getAuth: ctx.getAuth,
	};
}
