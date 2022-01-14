import type {AuthorizationCache, PermissionLookup} from '@imperium/authorization';
import {Authorization, noPermissionLookup} from '@imperium/authorization';
import type {Hoc} from '@imperium/client';
import {Environment} from '@thx/env';
import debug from 'debug';
import Dexie from 'dexie';
import {ComponentType, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {AuthContext} from '../AuthContext';
import type {ClientAuthorizationData, IAuth} from '../types';

const d = debug('imperium.auth-client.hoc.withAuth');

export interface AuthClientOptions {
	permissionLookup?: PermissionLookup<ClientAuthorizationData>;
}

interface CacheItem {
	key: string;
	timestamp: number;
	value: string;
}

function mapDexieToCache(cache: Dexie): AuthorizationCache {
	const staleMs = Environment.getInt('AUTH_PERMISSION_CACHE_EXPIRES') * 1000;
	return {
		async exists(key: string): Promise<boolean> {
			const item = (await cache.table('auth').get(key)) as CacheItem | undefined;
			return !!(item && Date.now() - item.timestamp < staleMs);
		},
		async get(key: string): Promise<any> {
			const item = (await cache.table('auth').get(key)) as CacheItem | undefined;
			if (item && Date.now() - item.timestamp < staleMs) {
				d(`Cache hit: ${key} -> ${item.value}`);
				return item.value;
			}
			return null;
		},
		async set(key: string, data: any): Promise<any> {
			d(`Cache write: ${key} -> ${data}`);
			const obj = {key, value: data, timestamp: Date.now()};
			await cache.table('auth').put(obj, data);
			return data;
		},
	};
}

export function withAuth(opts?: AuthClientOptions) {
	const permissionLookup = opts?.permissionLookup ? opts.permissionLookup : noPermissionLookup;

	return (): Hoc => {
		d('Creating Auth client');

		return function authHoc(WrappedComponent: ComponentType) {
			const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

			function ComponentWithAuth(props: any) {
				const [authenticated, setAuthenticated] = useState<IAuth>({
					id: localStorage.getItem(Environment.getString('authIdKey')) || '',
					access: localStorage.getItem(Environment.getString('authAccessTokenKey')) || '',
				});
				const cache = useRef<Dexie>(new Dexie('auth'));

				// Create an authorization class from the authenticated information
				const authorization = useMemo(() => {
					d('Creating new authorization');
					return new Authorization<ClientAuthorizationData>({
						id: authenticated.id,
						lookup: permissionLookup,
						extraData: {
							access: authenticated.access,
						},
					});
				}, [authenticated]);

				const clearCache = useCallback(async () => {
					await cache.current.table('auth').clear();
				}, []);

				const authContext = useMemo(() => {
					return {
						authorization,
						setAuthenticated,
						clearCache,
					};
				}, [authorization, clearCache]);

				useEffect(() => {
					(async function iife() {
						d('Configuring permission cache');

						if (!cache.current.isOpen()) {
							// Configure cache stores
							cache.current.version(1).stores({
								auth: '&key,timestamp',
							});
						}

						// Delete cached entries older than stale age
						await cache.current
							.table('auth')
							.where('timestamp')
							.below(Date.now() - Environment.getInt('AUTH_PERMISSION_CACHE_EXPIRES') * 1000)
							.delete();

						authorization.cache = mapDexieToCache(cache.current);
					})();
				}, [authorization]);

				// Cleanup if we ever become un-authenticated
				useEffect(() => {
					(async function iife() {
						// Check the id and access code to make sure they are both valid
						if (authenticated.id.length <= 0 || authenticated.access.length <= 0) {
							d('No authentication found, cleaning up persisted data');

							// The id or access code is invalid, so we will clear all persisted info
							await cache.current.table('auth').clear();
							localStorage.removeItem(Environment.getString('authIdKey'));
							localStorage.removeItem(Environment.getString('authAccessTokenKey'));
						}
					})();
				}, [authenticated]);

				return (
					<AuthContext.Provider value={authContext}>
						<WrappedComponent {...props} />
					</AuthContext.Provider>
				);
			}

			ComponentWithAuth.displayName = `withAuth(${displayName}`;

			return ComponentWithAuth;
		};
	};
}
