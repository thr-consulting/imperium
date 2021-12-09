import {Environment} from '@thx/env';
import debug from 'debug';
import {useContext} from 'react';
import type {LoginInfo, LoginReturn} from '../types';
import {AuthContext} from '../AuthContext';

const d = debug('imperium.auth-client.hooks.useLogin');

export function useLogin(): (loginInfo: LoginInfo) => Promise<void> {
	const {setAuthenticated} = useContext(AuthContext);

	return async (loginInfo: LoginInfo) => {
		// Send a POST request to login
		const res = await fetch(Environment.getString('authLoginUrl'), {
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
		localStorage.setItem(Environment.getString('authIdKey'), info.id);
		localStorage.setItem(Environment.getString('authAccessTokenKey'), info.access);
		// todo await authContext.clearCache();
	};
}
