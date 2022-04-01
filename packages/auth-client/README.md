# @imperium/auth-client

[![Coverage_badge](../../docs/assets/coverage/auth-client/coverage.svg)](assets/coverage/auth-client/index.html)
[![GitHub tag](https://img.shields.io/github/tag/darkadept/imperium.svg)](https://github.com/darkadept/imperium/tags/)
[![GitHub issues](https://img.shields.io/github/issues/darkadept/imperium.svg)](https://github.com/darkadept/imperium/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/darkadept/imperium.svg)](https://GitHub.com/darkadept/imperium/pull/)

[![GitHub license](https://img.shields.io/github/license/darkadept/imperium.svg)](https://github.com/darkadept/imperium/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/darkadept/imperium.svg)](https://github.com/darkadept/imperium/graphs/contributors/)

# About
This is an Imperium client module providing authentication and authorization support for a web client.

The major parts of this package are:
  * Imperium client module

The Imperium feature module tracks if a user is logged in. It also creates a cache for authorization information. The user
information is persisted in Local Storage. The authorization cache is persisted in an IndexedDB.

# Environment Variables
These can be specified in an `env.js` file. These are not secret or protected!

| Variable                     | Default                 | Description                                                    |
|------------------------------|-------------------------|----------------------------------------------------------------|
| IMP_PERMISSION_CACHE_EXPIRES | 3600                    | Number of seconds to expire the client side permissions cache. |
| IMP_API_URL                  | 'http://localhost:4001' | The URL of the api endpoint.                                   |
| authAccessTokenKey           | 'access'                | The local storage key that the access token is stored at.      |
| authIdKey                    | 'id'                    | The local storage key that the id is stored at.                |
| authRefreshUrl               | '/api/refresh'          | What the refresh endpoint is accessible at.                    |
| authLoginUrl                 | '/api/login'            | What the login endpoint is accessible at.                      |
| authForgotPasswordUrl        | '/api/forgot-password'  | What the forgot password endpoint is accessible at.            |
| authPermissionUrl            | '/api/auth              | What the permission endpoint is accessible at.                 |
