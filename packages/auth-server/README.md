# @imperium/auth-server

[![Coverage_badge](../../docs/assets/coverage/auth-server/coverage.svg)](assets/coverage/auth-server/index.html)
[![GitHub tag](https://img.shields.io/github/tag/darkadept/imperium.svg)](https://github.com/darkadept/imperium/tags/)
[![GitHub issues](https://img.shields.io/github/issues/darkadept/imperium.svg)](https://github.com/darkadept/imperium/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/darkadept/imperium.svg)](https://GitHub.com/darkadept/imperium/pull/)

[![GitHub license](https://img.shields.io/github/license/darkadept/imperium.svg)](https://github.com/darkadept/imperium/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/darkadept/imperium.svg)](https://github.com/darkadept/imperium/graphs/contributors/)

## Environment Variables
These can be specified in a `.env` file in the server package. These variables are secret and not shared with the client.

|Variable|Default|Description|
|---|---|---|
|AUTH_SERVER_DOMAIN|'localhost'|Which domain is the auth server running on. Used for cookies.|
|AUTH_LOGIN_URL|'/api/login'|URL for REST login.|
|AUTH_REFRESH_URL|'/api/refresh'|URL for REST refresh access token.|
|AUTH_FORGOTPASSWORD_URL|'/api/forgot-password'|URL to request password reset.|
|ACCESS_TOKEN_SECRET|'notsecure'|Secret for access tokens.|
|REFRESH_TOKEN_SECRET|'notsecure'|Secret for refresh tokens.|
|AUTH_ACCESS_TOKEN_EXPIRES|'5m'|How often an access token expires.|
|AUTH_REFRESH_TOKEN_EXPIRES|'7d'|How often a refresh token expires.|
|AUTH_MAX_FAIL|5|How many failed login attempts allowed.|
|AUTH_MAX_COOLDOWN|300|How many seconds to lock failed login attempts out.|
|AUTH_SHAREDCACHE_CONNECTOR|'sharedCache'|What the SharedConnector key is stored at in Connectors.|
|CORS_ORIGIN|false|The CORS origin. Which URL the the client running on?|
|AUTH_REFRESH_COOKIE_NAME|'refresh'|What cookie name is the refresh token stored as?|
|AUTH_PASSWORD_SALT_ROUNDS|11|The number of bcrypt rounds to salt the passwords with.|
