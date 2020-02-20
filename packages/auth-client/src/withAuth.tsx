import React, {useEffect, useState} from 'react';
import debug from 'debug';
import {Hoc, IImperiumClient} from '@imperium/client';
import {AuthContext, IAuth} from './AuthContext';

const d = debug('imperium.auth-client.withAuth');

export function withAuth(client: IImperiumClient): Hoc {
	d('Creating Auth client');

	return function authHoc(WrappedComponent: React.ComponentType) {
		const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

		function ComponentWithAuth(props: any) {
			const [auth, setAuth] = useState<IAuth | null>(null);

			useEffect(() => {
				setAuth({
					id: localStorage.getItem('id') || '',
					access: localStorage.getItem('access') || '',
				});
			}, []);

			return (
				<AuthContext.Provider value={{auth, setAuth: authVal => setAuth(authVal)}}>
					<WrappedComponent {...props} />
				</AuthContext.Provider>
			);
		}

		ComponentWithAuth.displayName = `withAuth(${displayName}`;

		return ComponentWithAuth;
	};
}
