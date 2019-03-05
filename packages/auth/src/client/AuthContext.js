import React from 'react';

export default React.createContext({
	userId: null,
	async user() {
		return null;
	},
	permissions: null,
});
