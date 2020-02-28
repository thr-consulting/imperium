# @imperium/graphql-server

[![Coverage_badge](../../docs/assets/coverage/graphql-server/coverage.svg)](assets/coverage/graphql-server/index.html)
[![GitHub tag](https://img.shields.io/github/tag/darkadept/imperium.svg)](https://github.com/darkadept/imperium/tags/)
[![GitHub issues](https://img.shields.io/github/issues/darkadept/imperium.svg)](https://github.com/darkadept/imperium/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/darkadept/imperium.svg)](https://GitHub.com/darkadept/imperium/pull/)

[![GitHub license](https://img.shields.io/github/license/darkadept/imperium.svg)](https://github.com/darkadept/imperium/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/darkadept/imperium.svg)](https://github.com/darkadept/imperium/graphs/contributors/)

## Environment Variables
These can be specified in a `.env` file in the server package. These variables are secret and not shared with the client.

|Variable|Default|Description|
|---|---|---|
|ACCESS_TOKEN_SECRET|'notsecure'| |The secret for signing the access tokens.| 
|GRAPHQL_URL|'api/graphql'|What the graphql endpoint URL is.|
|GRAPHQL_CREDENTIALS_REQUIRED|false|Should the graphql require credentials in order to be accessed?|
|CORS_ORIGIN|false|The CORS origin. Which URL the the client running on?|
|GRAPHQL_ENABLE_SUBSCRIPTIONS|false|Enable graphql subscriptions via a websocket.|
