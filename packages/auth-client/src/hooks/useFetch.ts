import debug from 'debug';
import {useCallback, useContext} from 'react';
import {CacheContext} from '../CacheContext';
import {injectNewAuthorization} from '../lib/injectNewAuthorization';
import {useAuthenticatedState} from '../state';
import {useAccessToken} from './useAccessToken';

const d = debug('imperium.auth-client.hooks.useFetch');

const f = window.fetch;

/**
 * A React hook that returns a standard `fetch` function. Injects authentication headers if the user is authenticated.
 * When the fetch function is called, it will double-check the authentication token and renew if necessary.
 */
export function useFetch() {
	const {id} = useAuthenticatedState();
	const {getToken} = useAccessToken();
	const cache = useContext(CacheContext);

	return useCallback(
		async (input: RequestInfo, init?: RequestInit) => {
			const token = await getToken();

			// If no user id, return the default fetch function
			if (!id || !token) {
				d('Fetching without auth token. No user id.');
				return f(input, init);
			}

			try {
				if (token) {
					d(`Fetching with auth token: ${token}`);
					return f(input, injectNewAuthorization(token, init));
				}
				d('Fetching without auth token. Access token could not be determined.');
				return f(input, init);
			} catch (err: any) {
				d(`Renewing access token failed: ${err.toString()}`);
				await cache.clearAll();
				throw new Error(`Renewing access token failed: ${err.toString()}`);
			}
		},
		[cache, getToken, id],
	);
}
