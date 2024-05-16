import debug from 'debug';
import {useContext} from 'react';
import {useDispatch} from 'react-redux';
import {CacheContext} from '../CacheContext';
import {login} from '../lib/login';
import {setAuthenticated} from '../state';
import type {LoginInfo} from '../types';

const d = debug('imperium.auth-client.hooks.useLogin');

type LoginFn = (loginInfo: LoginInfo) => Promise<void>;

/**
 * Returns a function that can be used to log in a user
 */
export function useLogin(): LoginFn {
	const dispatch = useDispatch();
	const cache = useContext(CacheContext);

	return async (loginInfo: LoginInfo) => {
		const info = await login(loginInfo);

		await cache.clearAll();
		dispatch(setAuthenticated({auth: {id: info.id}, token: info.access}));
	};
}
