import {useCallback, useContext} from 'react';
import {env} from '@thx/env';
import decode from 'jwt-decode';
import debug from 'debug';
import {defaults} from '../defaults';
import {injectNewAuthorization} from '../lib/injectNewAuthorization';
import {fetchAccessToken, isTokenValidOrUndefined} from '../lib/storage';
import {useLogout} from './useLogout';
import type {AccessToken} from '../types';
import {AuthContext} from '../AuthContext';

const d = debug('imperium.auth-client.hooks.useFetch');

const f = window.fetch;

export function useFetch() {
	const logout = useLogout();
	const authCtx = useContext(AuthContext);

	return useCallback(
		async (input: RequestInfo, init?: RequestInit) => {
			if (!authCtx.authorization.id) return f(input, init);
			let newAccess: string | null = null;
			if (!isTokenValidOrUndefined()) {
				d('Token is invalid');
				try {
					const newToken = await fetchAccessToken();
					const {access} = await newToken.json();
					newAccess = access;
					if (!newAccess) throw new Error('New access token could not be retrieved');
					window.localStorage.setItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey), access);
					authCtx.setAuthenticated({id: authCtx.authorization.id, access: newAccess});
					if (env.isDevelopment()) {
						const y = decode(access) as AccessToken;
						d(`Retrieved new access token. Expires: ${new Date(y.exp * 1000)}`);
					}
				} catch (err) {
					d('There was a problem refreshing the access token. Re-login required.');
					await logout();
				}
			}

			if (newAccess) {
				return f(input, injectNewAuthorization(newAccess, init));
			}
			return f(input, init);
		},
		[logout],
	);
}
