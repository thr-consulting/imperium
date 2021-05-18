import {AuthLevel} from '@imperium/authorization';
import {Environment} from '@thx/env';
import debug from 'debug';
import Dexie from 'dexie';
import React, {useEffect, useRef, useState} from 'react';
import type {Hoc} from '@imperium/client';
import {AuthContext, IAuth} from '../AuthContext';
import {fetchAuth, isTokenValidOrUndefined} from '../lib/fetching';

const d = debug('imperium.auth-client.hoc.withAuth');

interface CacheItem {
	key: string;
	timestamp: number;
	value: string;
}

export function withAuth(): Hoc {
	d('Creating Auth client');

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
						.below(Date.now() - Environment.getInt('authCacheStaleMs'))
						.delete();

					// Retrieve id and access from storage
					const id = localStorage.getItem(Environment.getString('authIdKey')) || '';
					const access = localStorage.getItem(Environment.getString('authAccessTokenKey')) || '';

					// Check the id and access code to make sure they are both valid
					if (id.length > 0 && access.length > 0) {
						setAuth({
							id,
							access,
						});
					} else {
						await cache.current.table('auth').clear();
						localStorage.removeItem(Environment.getString('authIdKey'));
						localStorage.removeItem(Environment.getString('authAccessTokenKey'));
					}

					setAuthEffectFinished(true);
				})();
			}, []);

			/**
			 * Get authentication information, renewing if necessary.
			 */
			async function getAuth() {
				if (!isTokenValidOrUndefined(auth?.access)) {
					const newAuth = await fetchAuth();
					localStorage.setItem(Environment.getString('authIdKey'), newAuth.id);
					localStorage.setItem(Environment.getString('authAccessTokenKey'), newAuth.access);
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
				if (item && Date.now() - item.timestamp < Environment.getInt('authCacheStaleMs')) {
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
