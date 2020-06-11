import React, {useEffect, useState} from 'react';
import debug from 'debug';
import type {Hoc, IImperiumClient} from '@imperium/client';
import {AuthContext, IAuth} from './AuthContext';

const d = debug('imperium.auth-client.withAuth');

export function withAuth(client: IImperiumClient): Hoc {
	d('Creating Auth client');

	return function authHoc(WrappedComponent: React.ComponentType) {
		const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

		function ComponentWithAuth(props: any) {
			const [auth, setAuth] = useState<IAuth | null>(null);
			const [authEffectFinished, setAuthEffectFinished] = useState<boolean>(false);

			useEffect(() => {
				const id = localStorage.getItem(client.globalConst.authLSIdKey as string) || '';
				const access = localStorage.getItem(client.globalConst.authLSAccessTokenKey as string) || '';

				if (id.length > 0 && access.length > 0) {
					setAuth({
						id,
						access,
					});
				} else {
					localStorage.removeItem(client.globalConst.authLSIdKey as string);
					localStorage.removeItem(client.globalConst.authLSAccessTokenKey as string);
				}
				setAuthEffectFinished(true);
			}, []);

			if (authEffectFinished) {
				return (
					<AuthContext.Provider value={{auth, setAuth: authVal => setAuth(authVal)}}>
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
