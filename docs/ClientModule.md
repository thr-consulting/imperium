# Client Module

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

```javascript
function startup(initialConfig, initialState, store) {
	
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
See [@thx/router](https://github.com/thr-consulting/thr-addons/tree/master/packages/router/docs) for more information.
