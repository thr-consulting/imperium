import {fetchAccessToken, isTokenValidOrUndefined} from '@imperium/auth-client';
import {env} from '@thx/env';
import debug from 'debug';
import {defaults} from './defaults';

const d = debug('imperium.auth-express-client.fetch');

const f = window.fetch;

export async function fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
	if (!isTokenValidOrUndefined()) {
		try {
			const newToken = await fetchAccessToken();
			d(newToken.statusText, newToken.status);
			const {access} = await newToken.json();
			window.localStorage.setItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey), access);
		} catch (err) {
			d('There was a problem refreshing the access token. Re-login required.');
			window.localStorage.removeItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey));
			window.localStorage.removeItem(env.getString('authIdKey', defaults.authIdKey));
		}
	}

	return f(input, init);
}
