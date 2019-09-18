---
id: environmentoptions
title: Environment Options
sidebar_label: Env Options
---

## Dev

#### Development
* IMPERIUM_DEV_CHOKIDAR_TIMEOUT: Number of milliseconds to debounce changing files. Default: 200

#### Production
* PROCESSES: Number of server processes to start in production mode. Defaults to number of CPU's available.

## Core
* PORT: Numerical port the server listens too. Default: 4001
* NODE_ENV: Standard env variable. Either 'production' or 'development'.
* ACCESS_TOKEN_SECRET: Defaults to 'notsecure'.

## Graphql
* PROTOCOL: The protocol the server is accessible via. Defaults to 'http'.
* HOST: The host the server is accessible via. Defaults to 'localhost'.
* GRAPHQL_URL: The URL the graphql API is accessible from. Defaults to '/api/graphql'.
* GRAPHQL_WS: If true, enables websockets for graphql. Defaults to false.
