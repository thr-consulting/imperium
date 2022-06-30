import {env} from '@thx/env';
import debug from 'debug';
import {defaults} from '../defaults';
import {injectNewAuthorization} from '../lib/injectNewAuthorization';
import {fetchAccessToken, isTokenValidOrUndefined} from '../lib/storage';
import {useLogout} from './useLogout';

const d = debug('imperium.auth-client.hooks.useFetch');

const f = window.fetch;

export function useFetch() {
	const logout = useLogout();

	return async (input: RequestInfo, init?: RequestInit) => {
		let newAccess: string | null = null;
		if (!isTokenValidOrUndefined()) {
			d('Token is invalid');
			try {
				const newToken = await fetchAccessToken();
				const {access} = await newToken.json();
				newAccess = access;
				window.localStorage.setItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey), access);
			} catch (err) {
				d('There was a problem refreshing the access token. Re-login required.');
				await logout();
			}
		}

		if (newAccess) {
			return f(input, injectNewAuthorization(newAccess, init));
		}
		return f(input, init);
	};
}
