---
id: imperiumServer
title: ImperiumServer
sidebar_label: ImperiumServer
---

The instance of the current ImperiumServer is passed down to a lot of the module definition functions.
ImperiumServer extends the `IImperiumServer`interface. 

## constructor(config: ImperiumServerConfig)
Creates a new instance of an Imperium server.

The config object is comprised of the following keys:

#### `connectors: ImperiumConnectors`
An instance of an `ImperiumConnectors` object.

#### `serverModules: ImperiumServerModuleFunction[]`
An array of `ImperiumServerModuleFunction`'s. These are functions that return the server module definitions.

#### `environment`
A function that returns an `ImperiumEnvironment` object. This object is merged together and can be used
to define server-wide environment variables or other "global" data. 

## async start()
This starts the server. Returns the instance of the `ImperiumServer` object.

## async stop()
This stops the server, closing any open connectors.

## connectors
An object that holds all the connectors that have been created. ie. `connectors.mongo`.

## modules
An object that holds all of the server module definitions.

## environment
An object that holds the server-wide environment variables.

## expressApp
The Express app.

## httpServer
The HTTP server.

## middleware
An object that holds all the available middleware functions from all modules.

## initialContextManager
The initial ContextManager used for startup.
