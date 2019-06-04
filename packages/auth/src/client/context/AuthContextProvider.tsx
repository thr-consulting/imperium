import React, {useState} from 'react';
import debug from 'debug';
import {AuthContext} from '@imperium/context';
import checkPermissions from './checkPermissions';
import {ClientAuth} from '../../../types';

const d = debug('imperium.auth.AuthContextProvider');

interface Props {
	auth: ClientAuth,
	children: JSX.Element,
}

export default function AuthContextProvider(props: Props) {
	const {auth} = props;
	const [state, setState] = useState(auth || {
		userId: null,
		user: null,
		permissions: [],
	});

	const eState = {
		...state,
		checkPermissions: reqPermissions => checkPermissions(state.permissions, reqPermissions, state.userId),
		setUser: ({userId, user, permissions}) => {
			setState({
				userId,
				user,
				permissions,
			});
		},
	};

	return (
		<AuthContext.Provider value={eState}>
			{props.children}
		</AuthContext.Provider>
	);
}
