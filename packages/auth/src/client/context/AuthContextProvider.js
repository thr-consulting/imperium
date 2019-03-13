/* eslint-disable react/forbid-prop-types */
import React, {useState} from 'react';
// import debug from 'debug';
import PropTypes from 'prop-types';
import {Context} from './context';
import checkPermissions from './checkPermissions';

// const d = debug('imperium.auth.AuthContextProvider');

export default function AuthContextProvider(props) {
	const {auth} = props;
	const [state, setState] = useState(auth || {
		userId: null,
		user: null,
		permissions: null,
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
		<Context.Provider value={eState}>
			{props.children}
		</Context.Provider>
	);
}

AuthContextProvider.propTypes = {
	auth: PropTypes.object,
	children: PropTypes.any,
};
