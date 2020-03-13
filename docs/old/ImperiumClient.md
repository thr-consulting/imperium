---
id: imperiumClient
title: ImperiumClient
sidebar_label: ImperiumClient
---

The instance of the current ImperiumClient is passed down to a lot of the module definition functions.

## constructor(options: ImperiumClientOptions)
Creates a new instance of an Imperium server.

The options object is comprised of the following keys:

#### `routeDefaults: {[key: string]: any}`

#### `rootRoute: ImperiumRoute`

#### `clientModules: ImperiumClientModuleFunction[]`
An array of `ImperiumClientModuleFunction`'s. These are functions that return the client module definition. 

## async start()
This starts the client.

## initialState

## initialConf
