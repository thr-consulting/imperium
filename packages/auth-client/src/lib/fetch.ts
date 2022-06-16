import {env} from '@thx/env';
import debug from 'debug';
import {defaults} from '../defaults';
import {authorizationHeader} from './authorizationHeader';
import {fetchAccessToken, isTokenValidOrUndefined} from './storage';

const d = debug('imperium.auth-client.lib.fetch');

const f = window.fetch;

export async function fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
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
			window.localStorage.removeItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey));
			window.localStorage.removeItem(env.getString('authIdKey', defaults.authIdKey));
		}
	}

	if (newAuthorization) {
		return f(input, {...init, headers: {...init?.headers, ...newAuthorization}});
	}
	return f(input, init);
}
