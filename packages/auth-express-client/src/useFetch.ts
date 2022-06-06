import {fetchAccessToken, isTokenValidOrUndefined, useLogout} from '@imperium/auth-client';
import debug from 'debug';
import {env} from '@thx/env';
import {defaults} from './defaults';

const d = debug('imperium.auth-express-client.useFetch');

const f = window.fetch;

export function useFetch() {
	const logout = useLogout();

	return async (input: RequestInfo, init?: RequestInit) => {
		if (!isTokenValidOrUndefined()) {
			try {
				const newToken = await fetchAccessToken();
				const {access} = await newToken.json();
				window.localStorage.setItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey), access);
			} catch (err) {
				d('There was a problem refreshing the access token. Re-login required.');
				await logout();
			}
		}

		return f(input, init);
	};
}
