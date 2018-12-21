---
id: clientModule
title: Client Module
sidebar_label: Client Module
---

Usually exported from a `client.js` file. Should be a function that returns an object.

```javascript
export default function() {
	return {
		// Core
		startup,
		reducers,
		routes,
	};
}
```

## startup
A function that is called once on client startup. ie. Page refresh.
It can optionally return an object that is passed as props to your `rootRender()` component.
See [Main: rootRender()](main#rootrenderjs) for more details.

```javascript
function startup(initialConfig, initialState, store) {
	return {
		myRootRenderProp: 'value',
	};
}
```

#### `initialConfig`
The initial configuration variable rendered directly in the initial index HTML file.

#### `initialState`
The initial state that was already fetched. Could be `null` if not logged in.

#### `store`
The Redux store

## reducers
An object of Redux reducers. Key names are used in the Redux root state.

```javascript
{
	reduxKey: () => {/* reducer function */},
}
```

## routes
An array of route objects.
See [Routes](routes) for more information.
