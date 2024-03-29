import {env} from '@thx/env';
import debug from 'debug';
import decode from 'jwt-decode';
import {defaults} from '../defaults';
import type {AccessToken, LoginReturn, IAuth} from '../types';

const d = debug('imperium.auth-client.lib.storage');

/**
 * @param token
 */
export function isTokenValidOrUndefined(token?: string): boolean {
	let accessToken: string | null | undefined = token;
	if (!token) {
		accessToken = localStorage.getItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey));
	}

	if (!accessToken) return true; // Empty token should be valid
	try {
		const decodedToken = decode(accessToken) as AccessToken;
		if (!decodedToken || !decodedToken.exp) return false;
		return Date.now() / 1000 + 3 <= decodedToken.exp; // 3-second grace period
	} catch (err) {
		d('Error decoding access token');
		return false;
	}
}

/**
 * Fetches a new access token as a Response promise from the refresh url.
 */
export async function fetchAccessToken(): Promise<Response> {
	d('Fetching new access token from refresh URL');
	const url = new URL(env.getString('authRefreshUrl', defaults.authRefreshUrl), env.getString('IMP_API_URL', defaults.IMP_API_URL));
	return fetch(url.href, {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
	});
}

/**
 * Fetches a new access token string from the refresh url.
 */
export async function fetchAccessTokenString(): Promise<string> {
	const res = await fetchAccessToken();
	if (res.status === 200) {
		const resObject = JSON.parse(await res.text()) as LoginReturn;
		return resObject.access;
	}

	throw new Error('Failed to fetch access token');
}

/**
 * Fetches a new decoded auth object from the refresh url.
 */
export async function fetchAuth(): Promise<IAuth> {
	const newAccessTokenString = await fetchAccessTokenString();
	const decodedToken = decode(newAccessTokenString) as AccessToken;
	return {
		id: decodedToken.id,
		access: newAccessTokenString,
	};
}
