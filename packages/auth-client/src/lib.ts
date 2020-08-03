import debug from 'debug';
import decode from 'jwt-decode';
import type {IImperiumClient} from '@imperium/client';
import type {AccessToken, LoginReturn} from './types';
import type {IAuth} from './AuthContext';

const d = debug('imperium.auth-client.lib');

export function isTokenValidOrUndefined(client: IImperiumClient, token?: string): boolean {
	let accessToken: string | null | undefined = token;
	if (!token) {
		accessToken = window.localStorage.getItem(client.globalConst.authLSAccessTokenKey as string);
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

export async function fetchAccessToken(client: IImperiumClient): Promise<Response> {
	return fetch(client.globalConst.authRefreshUrl as string, {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
	});
}

export async function fetchAccessTokenString(client: IImperiumClient): Promise<string> {
	const res = await fetchAccessToken(client);
	if (res.status === 200) {
		const resObject = JSON.parse(await res.text()) as LoginReturn;
		return resObject.access;
	}

	throw new Error('Failed to fetch access token');
}

export async function fetchAuth(client: IImperiumClient): Promise<IAuth> {
	const newAccessTokenString = await fetchAccessTokenString(client);
	const decodedToken = decode(newAccessTokenString) as AccessToken;
	return {
		id: decodedToken.id,
		access: newAccessTokenString,
	};
}
