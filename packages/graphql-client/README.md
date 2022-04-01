# @imperium/graphql-client

[![Coverage_badge](../../docs/assets/coverage/graphql-client/coverage.svg)](assets/coverage/graphql-client/index.html)
[![GitHub tag](https://img.shields.io/github/tag/darkadept/imperium.svg)](https://github.com/darkadept/imperium/tags/)
[![GitHub issues](https://img.shields.io/github/issues/darkadept/imperium.svg)](https://github.com/darkadept/imperium/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/darkadept/imperium.svg)](https://GitHub.com/darkadept/imperium/pull/)

[![GitHub license](https://img.shields.io/github/license/darkadept/imperium.svg)](https://github.com/darkadept/imperium/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/darkadept/imperium.svg)](https://github.com/darkadept/imperium/graphs/contributors/)

## Environment Variables
These can be specified in a `.env` file in the client package. These are also not secret as they are included in the client build and available on the client.

| Variable       | Default                  | Description                                                                                   |
|----------------|--------------------------|-----------------------------------------------------------------------------------------------|
| IMP_API_URL    | 'http://localhost:4001'  | The URL of the api endpoint.                                                                  |
| graphql        | '/api/graphql'           | What endpoint the graphql server is accessible at.                                            |
| graphqlws      | ''                       | What endpoint the graphql subscriptions server is accessible at. Should be a ws:// websocket. |
| apolloDefaults | *see `defaults.ts` file* | The defaults options loaded into Apollo client.                                               |
