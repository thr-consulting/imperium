import React from 'react';

const AuthContext = React.createContext({
	userId: null,
	async user() {
		return null;
	},
	permissions: null,
});

AuthContext.logInRouteKey = 'login';

export default AuthContext;
