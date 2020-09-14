import debug from 'debug';
import decode from 'jwt-decode';
import type {ImperiumClient} from '@imperium/client';
import type {AccessToken, LoginReturn} from './types';
import type {IAuth} from './AuthContext';
import {environment} from './environment';

const d = debug('imperium.auth-client.lib');

export function isTokenValidOrUndefined(client: ImperiumClient, token?: string): boolean {
	let accessToken: string | null | undefined = token;
	if (!token) {
		const env = environment(client?.environment);
		accessToken = window.localStorage.getItem(env.localStorageAccessTokenKey);
	}

	if (!accessToken) return true; // Empty token should be valid
	try {
		const decodedToken = decode(accessToken) as AccessToken;
		if (!decodedToken || !decodedToken.exp) return false;
		return Date.now() / 1000 <= decodedToken.exp;
	} catch (err) {
		d('Error decoding access token');
		return false;
	}
}

export async function fetchAccessToken(client: ImperiumClient): Promise<Response> {
	const env = environment(client?.environment);
	return fetch(env.refreshUrl, {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
	});
}

export async function fetchAccessTokenString(client: ImperiumClient): Promise<string> {
	const res = await fetchAccessToken(client);
	if (res.status === 200) {
		const resObject = JSON.parse(await res.text()) as LoginReturn;
		return resObject.access;
	}

	throw new Error('Failed to fetch access token');
}

export async function fetchAuth(client: ImperiumClient): Promise<IAuth> {
	const newAccessTokenString = await fetchAccessTokenString(client);
	const decodedToken = decode(newAccessTokenString) as AccessToken;
	return {
		id: decodedToken.id,
		access: newAccessTokenString,
	};
}
