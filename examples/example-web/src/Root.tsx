import {useAuthenticatedState} from '@imperium/auth-client';
import {ContentRouter} from '@imperium/router';
import {default as debug} from 'debug';
import React, {useCallback} from 'react';
import {Navigate, useLocation} from 'react-router-dom';
import {routes} from './sample-auth/routes';

const d = debug('imperium.example-web.Root');

export function Root(props: any): React.ReactNode {
	const {id} = useAuthenticatedState();
	const location = useLocation();

	const redirect = useCallback(() => {
		return <Navigate to={routes.to.login()} state={{from: location}} replace />;
	}, [location]);

	return <ContentRouter isAuthenticated={!!id} renderOnUnauth={redirect} {...props} />;
}
