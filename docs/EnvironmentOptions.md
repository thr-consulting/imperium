---
id: environmentoptions
title: Environment Options
sidebar_label: Env Options
---

Environment variables are in capitals. Corresponding variables are in brackets.

## Dev

#### Development

- **IMPERIUM_DEV_CHOKIDAR_TIMEOUT**: Number of milliseconds to debounce changing files. Default: 200

#### Production

- **PROCESSES**: Number of server processes to start in production mode. Defaults to number of CPU's available.

## Core

- **PORT** [port]: Numerical port the server listens too. Default: 4001
- **NODE_ENV** [nodeEnv]: Standard env variable. Either 'production' or 'development'.
- [production]: True if in production mode.
- [development]: True if in development mode.

## Graphql

- **ACCESS_TOKEN_SECRET** [graphqlAccessTokenSecret]: Defaults to 'notsecure'.
- **PROTOCOL**: The protocol the server is accessible via. Defaults to 'http'.
- **HOST**: The host the server is accessible via. Defaults to 'localhost'.
- **GRAPHQL_URL** [graphqlUrl]: The URL the graphql API is accessible from. Defaults to '/api/graphql'.
- **GRAPHQL_WS** [graphqlWs]: If true, enables websockets for graphql subscriptions. Defaults to false.
- **GRAPHQL_CREDENTIALS_REQUIRED** [graphqlCredentialsRequired]: If true, requires credentials to access the graphql endpoint. Enabling this will cause the @imperium/auth module to not work. Defaults to false.
- **GRAPHQL_CORS_ORIGIN** [graphqlCors]: If set, enables CORS and sets the accepted origin. Defaults to unset, which enables strict CORS.

Requires:
- [authAccessTokenSecret]

## Auth

- **AUTH_ACCESS_TOKEN_LS_NAME** [authAccessTokenLsName]: Key used for the client's localstorage of the access token. Defaults to: 'IMP.access'.
- **AUTH_REFRESH_TOKEN_LS_NAME** [authRefreshTokenLsName]: Key used for the client's localstorage of the refresh token. Defaults to: 'IMP.refresh'.
- **ACCESS_TOKEN_SECRET** [authAccessTokenSecret]: Defaults to 'notsecure'.
- **AUTH_ACCESS_TOKEN_EXPIRES** [authAccessTokenExpires]: Time until the access token expires. Defaults to '1h'.
- **AUTH_REFRESH_TOKEN_SECRET** [authRefreshTokenSecret]: Defaults to 'notsecure'.
- **AUTH_REFRESH_TOKEN_EXPIRES** [authRefreshTokenExpires]: Time until the refresh token expires. Defaults to '7d'.
- **AUTH_MAX_FAIL** [authMaxFail]: Maximum number of login failures allowed before lockout. Defaults to '5'.
- **AUTH_MAX_COOLDOWN** [authMaxCooldown]: Time in seconds to reset lockout status. Defaults to '300'.
- **AUTH_PASSWORD_SALT_ROUNDS** [authPasswordSaltRounds]: Numbers of salt rounds. Defaults to '11'.
- **AUTH_RECOVERY_TOKEN_EXPIRES** [authRecoveryTokenExpires]: Time until the password recovery token expires. Defaults to '2d'.
- **AUTH_ENABLE_SIGNUP** [authEnableSignup]: If true, allows signing up new users. Defaults to 'false'.

## User

- **USER_SYSADMIN_NAME** [userSysadminName]: Name of the default created sysadmin. Defaults to 'sysadmin'.
- **USER_SYSADMIN_EMAIL** [userSysadminEmail]: Email address of the default created sysadmin. Defaults to 'sysadmin@example.com'.
- **USER_SYSADMIN_PASSWORD** [userSysadminPassword]: Initial password of the default created sysadmin. Defaults to 'password'.
