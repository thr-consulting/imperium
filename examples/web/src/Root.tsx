import {useAuthenticatedState} from '@imperium/auth-client';
import {ContentRouter} from '@imperium/router';
import {default as debug} from 'debug';
import React, {useCallback} from 'react';
import {Redirect} from 'react-router';
import {routes} from './sample-auth/routes';

const d = debug('imperium.web.Root');

export function Root(props: any): React.ReactNode {
	const {id} = useAuthenticatedState();

	const redirect = useCallback(({location}: any) => {
		return <Redirect to={{pathname: routes.to.login(), state: {from: location}}} />;
	}, []);

	return <ContentRouter isAuthenticated={!!id} renderOnUnauth={redirect} {...props} />;
}
