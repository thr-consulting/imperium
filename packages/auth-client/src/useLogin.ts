import debug from 'debug';
import {useClient} from '@imperium/client';
import type {LoginInfo, LoginReturn} from './types';
import {useAuth} from './useAuth';

const d = debug('imperium.auth-client.useLogin');

export function useLogin(): (loginInfo: LoginInfo) => Promise<void> {
	const client = useClient();
	const auth = useAuth();

	return async (loginInfo: LoginInfo) => {
		// Send a POST request to login

		const url = typeof client?.globalConst.authLoginUrl === 'string' ? client?.globalConst.authLoginUrl : '';

		const res = await fetch(url, {
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
		localStorage.setItem(client?.globalConst.authLSIdKey as string, info.id);
		localStorage.setItem(client?.globalConst.authLSAccessTokenKey as string, info.access);
	};
}
