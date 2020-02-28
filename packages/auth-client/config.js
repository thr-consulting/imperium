/* eslint-disable @typescript-eslint/no-var-requires */
const {name} = require('./package.json');

module.exports = function() {
	const proto = process.env.SERVER_PROTOCOL || 'http';
	const host = process.env.SERVER_HOST || 'localhost';
	const port = parseInt(process.env.SERVER_PORT || '4001', 10);
	const loginUrl = process.env.AUTH_LOGIN_URL || '/api/login';
	const refreshUrl = process.env.AUTH_REFRESH_URL || '/api/refresh';
	const forgotPasswordUrl = process.env.AUTH_FORGOTPASSWORD_URL || '/api/forgot-password';

	const authLoginUrl = `${proto}://${host}${port === 80 ? '' : `:${port}`}${loginUrl}`;
	const authRefreshUrl = `${proto}://${host}${port === 80 ? '' : `:${port}`}${refreshUrl}`;
	const authForgotPasswordUrl = `${proto}://${host}${port === 80 ? '' : `:${port}`}${forgotPasswordUrl}`;

	return {
		name,
		initialConfig: {
			authLoginUrl,
			authRefreshUrl,
			authForgotPasswordUrl,
			authLSAccessTokenKey: process.env.AUTH_ACCESS_TOKEN_KEY || 'access',
			authLSIdKey: process.env.AUTH_ID_KEY || 'id',
		},
	};
};
