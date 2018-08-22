# Imperium Framework

The Imperium framework requires a certain folder structure in order to be implemented.

The following files should be included in your `src/imperium` folder.

## Core

### `Connectors.js`
This file is used to export your data connectors.

```javascript
export default class Connectors {
	async create() {
	}
	
	async close() {
	}
}
```

### `serverModules.js`
Use this file to declare your server modules. See [ServerModule](./ServerModule.md) for details.

```javascript
export default [
	myModule,
];
```

### `clientModules.js`
Use this file to declare your client modules. See [ClientModule](./ClientModule.md) for details.

```javascript
export default [
	myModule,
];
```

### `routeDefaults.js`
Use this file to declare your root route and default layout.

```javascript
export const rootRoute = {};
export default {
	layout: MyLayout,
	redirect: true,
};
```

### `rootRender.js`
Use this file to inject components before the root route.

```javascript
export default function rootRender(inner) {
	return (
		<MyComponent>
			{inner()}
		</MyComponent>
	)
}
```

#### `inner`
A function that renders the inner children.
