/* eslint-disable @typescript-eslint/no-var-requires */
const {name} = require('./package.json');

module.exports = function() {
	const proto = process.env.PROTOCOL || 'http';
	const host = process.env.HOST || 'localhost';
	const port = parseInt(process.env.PORT || '4001', 10);
	const loginUrl = process.env.AUTH_LOGIN_URL || '/api/login';
	const refreshUrl = process.env.AUTH_REFRESH_URL || '/api/refresh';
	const forgotPasswordUrl = process.env.AUTH_FORGOTPASSWORD_URL || '/api/forgot-password';

	return {
		name,
		initialConfig: {
			authLoginUrl: `${proto}://${host}:${port}${loginUrl}`,
			authRefreshUrl: `${proto}://${host}:${port}${refreshUrl}`,
			authForgotPasswordUrl: `${proto}://${host}:${port}${forgotPasswordUrl}`,
		},
	};
};
