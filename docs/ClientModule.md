---
id: clientModule
title: Client Module
sidebar_label: Client Module
---

Usually exported from a `client.js` file. Should be a function that returns an object. The name
you give to this function will show on the debug loading statement.

```javascript
export default function MyModuleName() {
	return {
		// Core
		startup,
		routes,		
		pre,
		
		// Graphql
		fragments,
	};
}
```

## startup
A function that is called once on client startup. ie. Page refresh.
It can optionally return an object that is passed as props to your `rootRender()` component.
See [Main: rootRender()](main#rootrenderjs) for more details.

```javascript
function startup(initialConfig, initialState) {
	return {
		myRootRenderProp: 'value',
	};
}
```

#### `initialConfig`
The initial configuration variable rendered directly in the initial index HTML file.

#### `initialState`
The initial state that was generated from module `pre` functions. Could be `null`.

```javascript
{	
	myInitialStateValue: 'value',
}
```

## routes
An array of route objects.
See [Routes](routes) for more information.

## pre
A function that is called when the client is initially being configured. It receives the
initial config values and the current initialState. Remember: initial state is being constructed
during this `pre` phase and is dependant on what modules are currently loaded and what the loading
order is. It should return an object that will be merged in to initialState.

```javascript
function pre(initialConfig, initialState) {
	return {
		myInitialStateValue: 'value',
	};
}
```

## fragments
An object the contains various GraphQL fragments. These can be referenced by other modules. 
