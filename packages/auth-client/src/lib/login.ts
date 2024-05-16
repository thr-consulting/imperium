import {env} from '@thx/env';
import {defaults} from '../defaults';
import type {LoginInfo, LoginReturn} from '../types';

export async function login(loginInfo: LoginInfo): Promise<LoginReturn> {
	// Send a POST request to login
	const url = new URL(env.getString('authLoginUrl', defaults.authLoginUrl), env.getString('IMP_API_URL', defaults.IMP_API_URL));

	const res = await fetch(url.href, {
		method: 'POST',
		mode: 'cors',
		credentials: 'include',
		body: JSON.stringify(loginInfo),
		headers: {
			'content-type': 'application/json',
		},
	});

	if (!res.ok) {
		const errorText = await res.text();
		throw new Error(errorText);
	}

	// Set authenticated and clear permission cache
	const info = (await res.json()) as LoginReturn;
	localStorage.setItem(env.getString('authIdKey', defaults.authIdKey), info.id);
	localStorage.setItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey), info.access);

	return info;
}
