# @imperium/graphql-client

[![Coverage_badge](../../docs/assets/coverage/graphql-client/coverage.svg)](assets/coverage/graphql-client/index.html)
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
|GRAPHQL_URL|'/api/graphql'|What endpoint the graphql server is accessible at.|
|GRAPHQL_WS|false|Enable graphql subscriptions via a websocket.|
