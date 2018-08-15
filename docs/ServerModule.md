# Server Module

Usually exported from a `server.js` file. Should be a function that returns an object.

```javascript
export default function() {
	return {
		// Core
		models,
		startup,
		endpoints,
		
		// Graphql
		schema,
		resolvers,
	};
}
```

## models
A function with the following signature:

```javascript
function models(connectors, context) {
	
}
```

#### `connectors`
An object that holds all the connectors that have been created. ie. `connectors.mongo`.

#### `context`
A [Context](Context.md) instance that has access to all models, authentication information, and connectors as well.

## startup
A function that returns a Promise. It is called once (for each worker) on server startup.

```javascript
async function startup(context) {
	
}
```

#### `context`
A [Context](Context.md) instance that has access to all models, authentication information, and connectors as well.

## endpoints
A function used to add new Express endpoints.

```javascript
function endpoints({app, connectors}) {
	
}
```

#### `app`
The Express app.

#### `connectors`
An object that holds all the connectors that have been created. ie. `connectors.mongo`.

## schema
*Used by the `@imperium/graphql` package.*

An array of GraphQL strings that represent the server schema, usually imported from `.graphqls` files.

## resolvers
*Used by the `@imperium/graphql` package.*

An GraphQL resolvers object. Will merge all `Query` and `Mutation` keys.
