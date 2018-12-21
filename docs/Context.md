---
id: context
title: Context
sidebar_label: Context
---

A Context object instance provides access to all the app's models, authentication information and connectors.

## Methods

### `addModule(moduleFunction)`
Adds a [server module](ServerModule.md) function to the Context instance.

### `getModel(name)`
Returns a specific model.

### `get models()`
Returns an object with all the models.

### `set auth(value)`
Sets the authentication information for this Context instance.

### `get auth()`
Gets the authentication information.

### `get connectors()`
Gets the connectors object.
