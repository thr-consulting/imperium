import React from 'react';
import {useAuth, useLogout} from '@imperium/auth-client';
import {Button} from 'semantic-ui-react';

export default function ComponentUsingAuth() {
	const {auth} = useAuth();
	const logout = useLogout();

	return (
		<>
			<h1>Component Using Auth</h1>
			<p>ID: {auth?.id}</p>
			<p>Access Token: {auth?.access}</p>
			<Button
				onClick={() => {
					logout();
				}}
			>
				Logout
			</Button>
		</>
	);
}
