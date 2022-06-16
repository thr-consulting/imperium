import {env} from '@thx/env';
import debug from 'debug';
import {defaults} from '../defaults';
import {authorizationHeader} from '../lib/authorizationHeader';
import {fetchAccessToken, isTokenValidOrUndefined} from '../lib/storage';
import {useLogout} from './useLogout';

const d = debug('imperium.auth-client.hooks.useFetch');

const f = window.fetch;

export function useFetch() {
	const logout = useLogout();

	return async (input: RequestInfo, init?: RequestInit) => {
		let newAuthorization: Record<string, string> | null = null;
		if (!isTokenValidOrUndefined()) {
			try {
				const newToken = await fetchAccessToken();
				const {access} = await newToken.json();
				// @ts-ignore
				if (init?.headers?.authorization) {
					newAuthorization = authorizationHeader(access);
				}
				window.localStorage.setItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey), access);
			} catch (err) {
				d('There was a problem refreshing the access token. Re-login required.');
				await logout();
			}
		}

		if (newAuthorization) {
			return f(input, {...init, headers: {...init?.headers, ...newAuthorization}});
		}
		return f(input, init);
	};
}
