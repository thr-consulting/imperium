/* eslint-disable @typescript-eslint/no-var-requires */
const {name} = require('./package.json');

module.exports = function() {
	return {
		name,
		initialConfig: {
			authAccessTokenLsName: process.env.AUTH_ACCESS_TOKEN_LS_NAME || 'IMP.access',
			authRefreshTokenLsName: process.env.AUTH_REFRESH_TOKEN_LS_NAME || 'IMP.refresh',
		},
	};
};
