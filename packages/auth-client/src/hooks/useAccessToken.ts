import {env} from '@thx/env';
import debug from 'debug';
import {useCallback, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {defaults} from '../defaults';
import {fetchAccessToken} from '../lib/fetchAccessToken';
import {isTokenValidOrUndefined} from '../lib/isTokenValidOrUndefined';
import {renewToken, useTokenState} from '../state';

const d = debug('imperium.auth-client.hooks.useAccessToken');

let isRenewing = false;

/**
 * Returns the current access token. Also returns a function that can be used to check and return a valid token.
 */
export function useAccessToken() {
	const dispatch = useDispatch();
	const {token} = useTokenState();

	const getToken = useCallback(async () => {
		if (!isTokenValidOrUndefined(token) && !isRenewing) {
			isRenewing = true;
			try {
				d('Token is invalid, renewing access token.');
				const tokenResponse = await fetchAccessToken();
				if (tokenResponse.status !== 200) {
					d(`Token could not renew: ${tokenResponse.statusText}`);
				} else {
					const {access: newAccess}: {access: string} = await tokenResponse.json(); // this can throw if json malformed
					d('Token renewed, publishing to redux state');
					window.localStorage.setItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey), newAccess);
					dispatch(renewToken(newAccess));
					return newAccess;
				}
			} catch (err: any) {
				d(`Failed to renew the access token: ${err.toString()}`);
			} finally {
				isRenewing = false;
			}
		}
		return token;
	}, [dispatch, token]);

	useEffect(() => {
		(async function iife() {
			await getToken();
		})();
	}, [getToken]);

	return {token, getToken};
}
