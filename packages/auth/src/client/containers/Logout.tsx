import debug from 'debug';
import React, {useEffect, useState} from 'react';
import {withApollo, WithApolloClient} from 'react-apollo';
import {Redirect} from 'react-router';
import useAuth from '../context/useAuth';

const d = debug('imperium.auth.Logout');

function Logout({client}: WithApolloClient<{}>) {
	const [redirect, setRedirect] = useState(false);
	const auth = useAuth();

	useEffect(() => {
		d('Logging out');
		// eslint-disable-next-line @typescript-eslint/camelcase,no-underscore-dangle
		const {jwt_localstorage_name, rtoken_localstorage_name} = window.__INITIAL_CONF__;
		window.localStorage.removeItem(jwt_localstorage_name);
		window.localStorage.removeItem(rtoken_localstorage_name);
		auth.setUser({
			userId: null,
			user: null,
			permissions: [],
		});
		setRedirect(true);
		return () => {
			d('Resetting store');
			client.resetStore();
		};
	}, []);

	if (redirect) {
		return (
			<Redirect to="/"/>
		);
	}
	return null;
}

export default withApollo(Logout);
