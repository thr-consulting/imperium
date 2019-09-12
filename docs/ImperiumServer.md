---
id: imperiumServer
title: ImperiumServer
sidebar_label: ImperiumServer
---

The instance of the current ImperiumServer is passed down to a lot of the module definition functions.

## constructor(options: ImperiumServerOptions)
Creates a new instance of an Imperium server.

The options object is comprised of the following keys:

#### `connectors: ImperiumConnectors`
An instance of an `ImperiumConnectors` object.

#### `serverModules: ImperiumServerModuleFunction[]`
An array of `ImperiumServerModuleFunction`'s. These are functions that return the server module definition.

#### `options`
A function that returns an object. This object is used as the base for the server-wide options object.

## async start()
This starts the server.

## async stop()
This stops the server, closing any open connectors.

## connectors
An object that holds all the connectors that have been created. ie. `connectors.mongo`.

## modules
An object that holds all of the server module definitions.

## options
An object that holds the server-wide options.

## app
The Express app.

## middleware
An object that holds all the available middleware functions from all modules.
