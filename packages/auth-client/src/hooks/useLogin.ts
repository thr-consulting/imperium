import {env} from '@thx/env';
import debug from 'debug';
import {useContext} from 'react';
import {AuthContext} from '../AuthContext';
import {defaults} from '../defaults';
import type {LoginInfo, LoginReturn} from '../types';

const d = debug('imperium.auth-client.hooks.useLogin');

export function useLogin(): (loginInfo: LoginInfo) => Promise<void> {
	const {setAuthenticated, clearCache} = useContext(AuthContext);

	return async (loginInfo: LoginInfo) => {
		// Send a POST request to login

		const res = await fetch(env.getString('authLoginUrl', defaults.authLoginUrl), {
			method: 'POST',
			mode: 'cors',
			credentials: 'include',
			body: JSON.stringify(loginInfo),
			headers: {
				'content-type': 'application/json',
			},
		});

		if (!res.ok) throw new Error(res.statusText);

		const info = (await res.json()) as LoginReturn;
		// Set the id and access token in React context
		setAuthenticated({id: info.id, access: info.access});
		// Save id and access token to localstorage
		localStorage.setItem(env.getString('authIdKey', defaults.authIdKey), info.id);
		localStorage.setItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey), info.access);
		// Clear permission cache
		await clearCache();
	};
}
