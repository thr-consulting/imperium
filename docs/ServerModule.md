---
id: serverModule
title: Server Module Definition
sidebar_label: Server Module
---

Modules can provide server-side logic.

```javascript
export default function MyModuleName() {
	return {
		// Required
		name,           // [String] Name of the module

		// Core
		environment,    // [Function] Imperium environment
		middleware,     // [Function] Express middleware
		endpoints,      // [Function] Express endpoints
		context,         // [Function] This function runs for every request. Return a map of context-specific instances. (ie. Dataloaders).
		startup,        // [Function] Startup function		
		
		// Graphql
		schema,           // Graphql Schema
		schemaDirectives, // Graphql Schema Directives
		resolvers,        // Graphql Resolvers
	};
}
```

## name
The string name of the module. You can import directly from the `package.json` file if you want.

```js
const {name} = require('./package.json');
```

## environment
A function that returns an object of strings, numbers or booleans or objects of the same.
This object can provide environment variables to the entire Imperium app.

Environment is processed in the `ImperiumServer` constructor.

The main use-case for this is because accessing `process.env` makes a C call every time and can potentially slow things down.

## middleware
A function that returns an object. This object should provide Express middleware that can be
called from any endpoint. The object's keys can be referenced from every endpoint.

Each keyed function should return a standard Express middleware handler.

```javascript
function middleware() {
	return {
		myCustomMiddleware() {
		  return (req, res, next) => {
		  	next();
          };
        },
		myCustomMiddlewareWithOptions(server: ImperiumServer) {
			return (req, res, next) => {
				next();
			};
		}
	};
}
```

Some middleware is already available by default:
  * `contextManagerMiddleware` - Provides a `ContextManager` instance on every `req` object at `req.contextManager`.
  
#### `server`
A reference to the current [ImperiumServer](ImperiumServer.md) instance.

## endpoints
A function that can be used to create additional Express endpoints.

```javascript
function endpoints(server: ImperiumServer) {
	server.app.use(...);
}
```

#### `server`
A reference to the current [ImperiumServer](ImperiumServer.md) instance.

## context
This function is called for every single request. This allows DataLoader's to be created new for every request.

It has the following signature:

```javascript
function context(server, contextManager) {
	return {
		MyDataloader: new DataLoader(ids => MyModel.find({_id: {$in: ids}}).exec()),
	};
}
```

#### `server`
An [ImperiumServer](ImperiumServer.md) instance.

#### `contextManager`
A [ContextManager](ContextManager.md) instance that has access to all context and authentication information.

## startup
A function that returns a Promise. It is called once (for each worker) on server startup. The value returned
is not used.

```javascript
async function startup(server: ImperiumServer) {
	
}
```

#### `server`
An [ImperiumServer](ImperiumServer.md) instance.

---------------------------------------------------------------------------------

## GraphQL

## schema
*Used by the `@imperium/graphql` package.*

An array of GraphQL schema that represent the server schema, usually imported from `.graphqls` files.

## schemaDirectives
*Used by the `@imperium/graphql` package.*

An object containing GraphQL schema directives.

## resolvers
*Used by the `@imperium/graphql` package.*

A function that returns a GraphQL resolvers object. Will merge all `Query`, `Mutation` and `Subscription` keys.
