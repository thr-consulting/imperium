---
id: clientModule
title: Client Module Definition
sidebar_label: Client Module
---

Modules can provide client-side logic.

```javascript
export default function MyModuleName() {
	return {
		// Required
		name, // [String] Name of the module

		// Core
		initialState, // [Function]
		startup, // [Function]
		hocs, // [Array of Functions]

		// Router
		routes, // [Array of Route Objects]

		// Graphql
		fragments,
	};
}
```

## name

The string name of the module. You can import directly from the `package.json` file if you want.

```js
const {name} = require('./package.json');
```

## initialState

A function that is called when the client is initially being configured. It receives the
initial config values and the current initialState. Remember: initial state is being constructed
during this `initialState` phase and is dependant on what modules are currently loaded and what the loading
order is. It should return an object that will be merged in to initialState.

```javascript
function initialState(initialConfig, currentInitialState) {
	return {
		myInitialStateValue: 'value',
	};
}
```

## startup

A function that is called once on client startup. ie. Page refresh.
It can optionally return an object that is passed as props to the RouteDirector component.

```javascript
function startup(client: ImperiumClient) {
	return {
		myRootProp: 'value',
	};
}
```

## hocs

An array of functions that create higher order components that will wrap the root components.

# Router

## routes

An array of route objects.
See [Routes](routes) for more information.

# Graphql

## fragments
