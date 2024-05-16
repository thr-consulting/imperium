import {type AuthenticationToken, Authorization, noPermissionLookup} from '@imperium/authorization';
import type {Hoc} from '@imperium/client';
import {env} from '@thx/env';
import debug from 'debug';
import {ComponentType, memo, useEffect, useMemo, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {AuthContext} from '../AuthContext';
import {CacheContext} from '../CacheContext';
import {DexieCache} from '../DexieCache';
import {defaults} from '../defaults';
import {useAccessToken} from '../hooks/useAccessToken';
import {setAuthenticated, useAuthenticatedState} from '../state';
import type {AuthClientOptions} from '../types';

const d = debug('imperium.auth-client.hoc.withAuth');

export function withAuth(opts?: AuthClientOptions) {
	const lookup = opts?.lookup ? opts?.lookup : noPermissionLookup;

	return (): Hoc => {
		return function authHoc(Wrapped: ComponentType) {
			const displayName = Wrapped.displayName || Wrapped.name || 'Component';
			const MemoWrapped = memo(Wrapped);

			function WithAuth(props: any) {
				const {id} = useAuthenticatedState();
				const {token, getToken} = useAccessToken();
				const dispatch = useDispatch();
				const cache = useRef<DexieCache>(new DexieCache());

				// Prepares the authContext variable
				const authContext = useMemo(() => {
					d(`(Re)creating authContext. Id: ${id}`);
					return {
						authorization: new Authorization<AuthenticationToken>({
							authorizationCache: cache.current,
							lookup,
							dataloaderCache: false,
							extra: {
								auth: {
									id,
								},
								getToken,
							},
						}),
					};
				}, [getToken, id]);

				// Open the permission cache
				useEffect(() => {
					(async function iife() {
						await cache.current.open();
					})();
				}, [authContext]);

				// Cleanup if we ever become un-authenticated
				useEffect(() => {
					(async function iife() {
						// Check the id and access code to make sure they are both valid
						if (!id || (token?.length || 0) <= 0) {
							d('No authentication found, cleaning up persisted data');

							// The id or access code is invalid, so we will clear all persisted info
							localStorage.removeItem(env.getString('authIdKey', defaults.authIdKey));
							localStorage.removeItem(env.getString('authAccessTokenKey', defaults.authAccessTokenKey));
							await cache.current.clearAll();
							dispatch(setAuthenticated({token: null}));
						}
					})();
				}, [dispatch, id, token?.length]);

				return (
					<CacheContext.Provider value={cache.current}>
						<AuthContext.Provider value={authContext}>
							<MemoWrapped {...props} />
						</AuthContext.Provider>
					</CacheContext.Provider>
				);
			}

			WithAuth.displayName = `withAuth(${displayName})`;

			return WithAuth;
		};
	};
}
