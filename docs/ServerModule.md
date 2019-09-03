---
id: serverModule
title: Server Module
sidebar_label: Server Module
---

An Imperium Server module is a function that returns the following data structure.

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

## options
A function that returns an object. This object can provide data to the entire Imperium app. It's a good place
to process environment variables.

## middleware
A function that returns an object. This object should provide Express middleware that can be
called from any endpoint. The key is the name of the middleware.

```javascript
function middleware() {
	return {
		myCustomMiddleware(req, res, next) {
			next();
		},
		myCustomMiddlewareWithOptions(options) {
			return (req, res, next) => {
				next();
			};
		}
	};
}
```

Some middleware is already available:
  * `contextMiddleware` 

## endpoints
A function that returns an object. The object's values are Express endpoints.

```javascript
function endpoints({app, connectors, modules, middlewares}) {
	app.use(...);
}
```

#### `app`
The Express app.

#### `connectors`
An object that holds all the connectors that have been created. ie. `connectors.mongo`.

#### `modules`
An object that holds all of the server modules.

#### `middlewares`
An object that holds all the middleware from all modules.

## models
This function is called for every single request. This allows DataLoader's to be created new for every request.
Certain types of models don't need to be created every time, just passed through. (ie. Mongoose models).
It has the following signature:

```javascript
function models(connectors, context) {
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

## startup
A function that returns a Promise. It is called once (for each worker) on server startup.
It shouldn't return anything.

```javascript
async function startup(context) {
	
}
```

#### `context`
A [Context](Context.md) instance that has access to all models, authentication information, and connectors as well.

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



# This is moved

## initialConfig
A function that returns an object. This object is embedded in the index HTML file and is
available on the client immediately as `window.__INITIAL_CONFIG__`;

```javascript
function initialConfig() {
	return {
		myInitialConfigValue: 'value',
	};
}
```
