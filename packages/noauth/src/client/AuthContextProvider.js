/* eslint-disable react/no-unused-state */
import React from 'react';
import AuthContext from './AuthContext';

export default class AuthContextProvider extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			checkPermissions: this.checkPermissions,
		};
	}

	checkPermissions = () => ({
		isAuthorized: false,
		isAuthenticated: true,
	});

	render() {
		return (
			<AuthContext.Provider value={this.state}>
				{this.props.children}
			</AuthContext.Provider>
		);
	}
}
