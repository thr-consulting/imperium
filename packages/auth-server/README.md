# @imperium/auth-server

[![Coverage_badge](../../docs/assets/coverage/auth-server/coverage.svg)](assets/coverage/auth-server/index.html)
[![GitHub tag](https://img.shields.io/github/tag/darkadept/imperium.svg)](https://github.com/darkadept/imperium/tags/)
[![GitHub issues](https://img.shields.io/github/issues/darkadept/imperium.svg)](https://github.com/darkadept/imperium/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/darkadept/imperium.svg)](https://GitHub.com/darkadept/imperium/pull/)

[![GitHub license](https://img.shields.io/github/license/darkadept/imperium.svg)](https://github.com/darkadept/imperium/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/darkadept/imperium.svg)](https://github.com/darkadept/imperium/graphs/contributors/)

## Environment Variables
These can be specified in a `.env` file in the server package. These variables are secret and not shared with the client.

| Variable                  |Default|Description|
|---------------------------|---|---|
| IMP_AUTH_SERVER_DOMAIN    |'localhost'|Which domain is the auth server running on. Used for cookies.|
| IMP_LOGIN_URL             |'/api/login'|URL for REST login.|
| IMP_REFRESH_URL           |'/api/refresh'|URL for REST refresh access token.|
| IMP_RESET_URL             |'/api/forgot-password'|URL to request password reset.|
| IMP_ACCESS_TOKEN_SECRET   |'notsecure'|Secret for access tokens.|
| IMP_REFRESH_TOKEN_SECRET  |'notsecure'|Secret for refresh tokens.|
| IMP_ACCESS_TOKEN_EXPIRES  |'5m'|How often an access token expires.|
| IMP_REFRESH_TOKEN_EXPIRES |'7d'|How often a refresh token expires.|
| IMP_MAX_FAIL              |5|How many failed login attempts allowed.|
| IMP_MAX_COOLDOWN          |300|How many seconds to lock failed login attempts out.|
| IMP_REFRESH_COOKIE_NAME   |'refresh'|What cookie name is the refresh token stored as?|
| IMP_PASSWORD_SALT_ROUNDS  |11|The number of bcrypt rounds to salt the passwords with.|
