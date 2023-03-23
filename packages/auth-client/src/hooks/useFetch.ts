import {env} from '@thx/env';
import debug from 'debug';
import decode from 'jwt-decode';
import {useCallback, useContext} from 'react';
import {AuthContext} from '../AuthContext';
import {defaults} from '../defaults';
import {injectNewAuthorization} from '../lib/injectNewAuthorization';
import {fetchAccessToken, isTokenValidOrUndefined} from '../lib/storage';
import type {AccessToken} from '../types';
import {useLogout} from './useLogout';

const d = debug('imperium.auth-client.hooks.useFetch');

const f = window.fetch;

export function useFetch() {
	const logout = useLogout();
	const authCtx = useContext(AuthContext);

	return useCallback(
		async (input: RequestInfo, init?: RequestInit) => {

			// If user id is null, return the default fetch function
			if (!authCtx.authorization.id) return f(input, init);


			let newAccess: string | null = null;
			// If the token is not valid or undefined (aka expired), try to refresh it
			if (!isTokenValidOrUndefined()) {
				d('Token is invalid');
				try {
					// Fetch new access token from refresh URL
					const newToken = await fetchAccessToken();
					const {access} = await newToken.json();
					newAccess = access;
					if (!newAccess) throw new Error('New access token could not be retrieved');

					// Store the access token in localstorage
					window.localStorage.setItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey), access);

					// Update context with the new access token
					authCtx.setAuthenticated({id: authCtx.authorization.id, access: newAccess});

					// Display the new access token expiry in dev mode
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
		[authCtx, logout],
	);
}
