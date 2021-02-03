import type {Hoc, ImperiumClient} from '@imperium/client';
import React, {useEffect, useRef, useState} from 'react';
import debug from 'debug';
import Dexie from 'dexie';
import {AuthContext, IAuth} from './AuthContext';
import {fetchAuth, isTokenValidOrUndefined} from './lib';
import {environment} from './environment';
import {AuthLevel} from './AuthLevel';

const d = debug('imperium.auth-client.withAuth');

interface CacheItem {
	key: string;
	timestamp: number;
	value: string;
}

export function withAuth(client: ImperiumClient): Hoc {
	d('Creating Auth client');

	const env = environment(client?.environment);

	return function authHoc(WrappedComponent: React.ComponentType) {
		const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

		function ComponentWithAuth(props: any) {
			const [auth, setAuth] = useState<IAuth | null>(null);
			const [authEffectFinished, setAuthEffectFinished] = useState<boolean>(false);
			const cache = useRef<Dexie>(new Dexie('auth'));

			useEffect(() => {
				(async function iife() {
					// Configure cache stores
					cache.current.version(1).stores({
						auth: '&key,timestamp',
					});

					// Delete cached entries older than stale age
					await cache.current
						.table('auth')
						.where('timestamp')
						.below(Date.now() - env.authCacheStaleMs)
						.delete();

					// Retrieve id and access from storage
					const id = localStorage.getItem(env.localStorageIdKey) || '';
					const access = localStorage.getItem(env.localStorageAccessTokenKey) || '';

					// Check the id and access code to make sure they are both valid
					if (id.length > 0 && access.length > 0) {
						setAuth({
							id,
							access,
						});
					} else {
						localStorage.removeItem(env.localStorageIdKey);
						localStorage.removeItem(env.localStorageAccessTokenKey);
					}

					setAuthEffectFinished(true);
				})();
			}, []);

			/**
			 * Get authentication information, renewing if necessary.
			 */
			async function getAuth() {
				if (!isTokenValidOrUndefined(client, auth?.access)) {
					const newAuth = await fetchAuth(client);
					localStorage.setItem(env.localStorageIdKey, newAuth.id);
					localStorage.setItem(env.localStorageAccessTokenKey, newAuth.access);
					setAuth(newAuth);
					return newAuth;
				}
				return auth;
			}

			/**
			 * Get item from auth cache.
			 * @param key
			 */
			async function getCache(key: string) {
				const item = (await cache.current.table('auth').get(key)) as CacheItem | undefined;
				if (item && Date.now() - item.timestamp < env.authCacheStaleMs) {
					d(`Cache hit: ${key}`);
					return AuthLevel.fromString(item.value);
				}
				return null;
			}

			/**
			 * Set auth level in auth cache.
			 * @param key
			 * @param level
			 */
			async function setCache(key: string, level: AuthLevel) {
				d(`Cache write: ${key}`);
				const obj = {key, value: level.toString(), timestamp: Date.now()};
				await cache.current.table('auth').put(obj, key);
			}

			/**
			 * Clear the auth cache
			 */
			async function clearCache() {
				await cache.current.table('auth').clear();
			}

			// This will render null until we have retrieved authentication from storage.
			if (authEffectFinished) {
				return (
					<AuthContext.Provider
						value={{
							auth,
							setAuth: authVal => setAuth(authVal),
							getAuth,
							getCache,
							setCache,
							clearCache,
						}}
					>
						<WrappedComponent {...props} />
					</AuthContext.Provider>
				);
			}
			return null;
		}

		ComponentWithAuth.displayName = `withAuth(${displayName}`;

		return ComponentWithAuth;
	};
}
