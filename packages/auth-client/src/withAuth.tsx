import React, {useEffect, useState} from 'react';
import debug from 'debug';
import type {Hoc, ImperiumClient} from '@imperium/client';
import {AuthContext, IAuth} from './AuthContext';
import {fetchAuth, isTokenValidOrUndefined} from './lib';
import {environment} from './environment';

const d = debug('imperium.auth-client.withAuth');

export function withAuth(client: ImperiumClient): Hoc {
	d('Creating Auth client');

	const env = environment(client?.environment);

	return function authHoc(WrappedComponent: React.ComponentType) {
		const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

		function ComponentWithAuth(props: any) {
			const [auth, setAuth] = useState<IAuth | null>(null);
			const [authEffectFinished, setAuthEffectFinished] = useState<boolean>(false);

			useEffect(() => {
				const id = localStorage.getItem(env.localStorageIdKey) || '';
				const access = localStorage.getItem(env.localStorageAccessTokenKey) || '';

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
			}, []);

			if (authEffectFinished) {
				return (
					<AuthContext.Provider
						value={{
							auth,
							setAuth: authVal => setAuth(authVal),
							getAuth: async () => {
								if (!isTokenValidOrUndefined(client, auth?.access)) {
									const newAuth = await fetchAuth(client);
									localStorage.setItem(env.localStorageIdKey, newAuth.id);
									localStorage.setItem(env.localStorageAccessTokenKey, newAuth.access);
									setAuth(newAuth);
									return newAuth;
								}
								return auth;
							},
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
