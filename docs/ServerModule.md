---
id: serverModule
title: Server Module
sidebar_label: Server Module
---

Usually exported from a `server.js` file. Should be a function that returns an object. The name
you give to this function will show on the debug loading statement.

```javascript
export default function MyModuleName() {
	return {
		// Core
		models,         // Data Models (Mongo, Mongoose, pure logic, Dataloaders, etc)
		startup,        // Startup function
		endpoints,      // Custom Express endpoints
		initialConfig,  // Initial configuration
		middleware,     // Express middleware that can be called from other modules
		
		// Graphql
		schema,           // Graphql Schema
		schemaDirectives, // Graphql Schema Directives
		resolvers,        // Graphql Resolvers
	};
}
```

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

## endpoints
A function used to add new Express endpoints.

```javascript
function endpoints({app, connectors, modules, middleware}) {
	app.use(...);
}
```

#### `app`
The Express app.

#### `connectors`
An object that holds all the connectors that have been created. ie. `connectors.mongo`.

#### `modules`
An object that holds all of the server modules.

#### `middleware`
An object that holds all the middleware from all modules.

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

## middleware
A function that returns an object. This object should provide Express middleware that can be
called from endpoints.

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

## schema
*Used by the `@imperium/graphql` package.*

An array of GraphQL strings that represent the server schema, usually imported from `.graphqls` files.

## schemaDirectives
*Used by the `@imperium/graphql` package.*

An object containing GraphQL schema directives.

## resolvers
*Used by the `@imperium/graphql` package.*

An GraphQL resolvers object. Will merge all `Query` and `Mutation` keys.
