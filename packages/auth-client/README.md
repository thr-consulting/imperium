# @imperium/auth-client

[![Coverage_badge](../../docs/assets/coverage/auth-client/coverage.svg)](assets/coverage/auth-client/index.html)
[![GitHub tag](https://img.shields.io/github/tag/darkadept/imperium.svg)](https://github.com/darkadept/imperium/tags/)
[![GitHub issues](https://img.shields.io/github/issues/darkadept/imperium.svg)](https://github.com/darkadept/imperium/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/darkadept/imperium.svg)](https://GitHub.com/darkadept/imperium/pull/)

[![GitHub license](https://img.shields.io/github/license/darkadept/imperium.svg)](https://github.com/darkadept/imperium/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/darkadept/imperium.svg)](https://github.com/darkadept/imperium/graphs/contributors/)

## Environment Variables
These can be specified in a `.env` file in the client package. These are also not secret as they are included in the client build and available on the client.

|Variable|Default|Description|
|---|---|---|
|SERVER_PROTOCOL|'http'|What protocol the server is accessible at.|
|SERVER_HOST|'localhost'|What host the server is accessible at.|
|SERVER_PORT|4001|What port the server is accessible at.|
|AUTH_LOGIN_URL|'/api/login'|What the login endpoint is accessible at.|
|AUTH_REFRESH_URL|'/api/refresh'|What the refresh endpoint is accessible at.|
|AUTH_FORGOTPASSWORD_URL|'/api/forgot-password'|What the forgot password endpoint is accessible at.|
|AUTH_ACCESS_TOKEN_KEY|'access'|The local storage key that the access token is stored at.|
|AUTH_ID_KEY|'id'|The local storage key that the id is stored at.|
