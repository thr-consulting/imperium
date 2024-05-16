import {env} from '@thx/env';
import debug from 'debug';
import {defaults} from '../defaults';

const d = debug('imperium.auth-client.lib.fetchAccessToken');

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
