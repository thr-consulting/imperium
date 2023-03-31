import {env} from '@thx/env';
import debug from 'debug';
import {defaults} from '../defaults';
import {injectNewAuthorization} from './injectNewAuthorization';
import {fetchAccessToken, isTokenValidOrUndefined} from './storage';

const d = debug('imperium.auth-client.lib.fetch');

const f = window.fetch;

export async function fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
	let newAccess = window.localStorage.getItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey));
	d(`Fetching with: ${newAccess}`);
	if (!isTokenValidOrUndefined()) {
		d('Fetching access token');
		try {
			const newToken = await fetchAccessToken();
			const {access} = await newToken.json();
			d(`Fetched access token: ${access}`);
			newAccess = access;
			window.localStorage.setItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey), access);
		} catch (err) {
			d('There was a problem refreshing the access token. Re-login required.');
			window.localStorage.removeItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey));
			window.localStorage.removeItem(env.getString('authIdKey', defaults.authIdKey));
		}
	}

	if (newAccess) {
		return f(input, injectNewAuthorization(newAccess, init));
	}
	return f(input, init);
}
