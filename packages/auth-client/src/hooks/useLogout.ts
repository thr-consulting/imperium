import {env} from '@thx/env';
import debug from 'debug';
import {useContext} from 'react';
import {useDispatch} from 'react-redux';
import {CacheContext} from '../CacheContext';
import {defaults} from '../defaults';
import {setAuthenticated} from '../state';

const d = debug('imperium.auth-client.hooks.useLogout');

type LogoutFn = () => Promise<void>;

/**
 * Returns a function that can be used to log out a user.
 */
export function useLogout(): LogoutFn {
	const dispatch = useDispatch();
	const cache = useContext(CacheContext);

	return async () => {
		localStorage.removeItem(env.getString('authIdKey', defaults.authIdKey));
		localStorage.removeItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey));
		await cache.clearAll();
		dispatch(setAuthenticated({token: null}));
	};
}
