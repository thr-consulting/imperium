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
		options,        // [Function] Imperium options
		middleware,     // [Function] Express middleware
		endpoints,      // [Function] Express endpoints
		models,         // [Function] Data Models (Mongo, Mongoose, pure logic, Dataloaders, etc)
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

## options
A function that returns an object. This object can provide data to the entire Imperium app. It's a good place
to process and store environment variables.

Options are processed on the `ImperiumServer` constructor.

The reason for this is because accessing `process.env` makes a C call every time and can potentially slow things down.

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
  * `contextMiddleware` - Provides a `context` instance on every `req` object.
  
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

## models
This function is called for every single request. This allows DataLoader's to be created new for every request.
Certain types of models don't need to be created every time, just passed through. (ie. Mongoose models).
It has the following signature:

```javascript
function models(connectors, context, options) {
	return {
		MyModel: mongoose.model('users', myMongooseSchema),
		MyDataloader: new DataLoader(ids => context.models.MyModel.find({_id: {$in: ids}}).exec()),
		MyCustomLogicModel: new CustomLogicModel(connectors.mongo, context),
	};
}
```

#### `connectors`
An object that holds all the connectors that have been created. ie. `connectors.mongo`.

#### `context`
A [Context](Context.md) instance that has access to all models, authentication information, and connectors as well.

#### `options`
The options object that defined from various modules and stored in  the current [ImperiumServer](ImperiumServer.md) instance.

## startup
A function that returns a Promise. It is called once (for each worker) on server startup.
It shouldn't return anything.

```javascript
async function startup(server: ImperiumServer) {
	
}
```

#### `server`
A [Context](Context.md) instance that has access to all models, authentication information, and connectors as well.

---------------------------------------------------------------------------------

## GraphQL

## schema
*Used by the `@imperium/graphql` package.*

An array of GraphQL strings that represent the server schema, usually imported from `.graphqls` files.

## schemaDirectives
*Used by the `@imperium/graphql` package.*

An object containing GraphQL schema directives.

## resolvers
*Used by the `@imperium/graphql` package.*

An GraphQL resolvers object. Will merge all `Query` and `Mutation` keys.
