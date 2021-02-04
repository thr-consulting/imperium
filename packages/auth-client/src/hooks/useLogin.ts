import {useContext} from 'react';
import debug from 'debug';
import {useClient} from '@imperium/client';
import type {LoginInfo, LoginReturn} from '../types';
import {useAuthId} from './useAuthId';
import {environment} from '../environment';
import {AuthContext} from '../AuthContext';

const d = debug('imperium.auth-client.useLogin');

export function useLogin(): (loginInfo: LoginInfo) => Promise<void> {
	const authContext = useContext(AuthContext);
	const client = useClient();
	const auth = useAuthId();

	const env = environment(client?.environment);

	return async (loginInfo: LoginInfo) => {
		// Send a POST request to login
		const res = await fetch(env.loginUrl, {
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
		auth.setAuth({id: info.id, access: info.access});
		// Save id and access token to localstorage
		localStorage.setItem(env.localStorageIdKey, info.id);
		localStorage.setItem(env.localStorageAccessTokenKey, info.access);
		await authContext.clearCache();
	};
}
