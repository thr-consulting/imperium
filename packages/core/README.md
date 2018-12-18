[![Coverage_badge](../../docs/assets/coverage/core/coverage.svg)](assets/coverage/core/index.html) [![Greenkeeper badge](https://badges.greenkeeper.io/darkadept/imperium.svg)](https://greenkeeper.io/)

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
Use this file to declare your server modules. See [ServerModule](docs/ServerModule.md) for details.

```javascript
export default [
	myModule,
];
```

### `clientModules.js`
Use this file to declare your client modules. See [ClientModule](docs/ClientModule.md) for details.

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
	
	const renderOptions = {
		checkPermissions: (auth, permissions) => {}, // See @imperium/auth readme.
	};
	
	return (
		<MyComponent>
			{inner(renderOptions)}
		</MyComponent>
	)
}
```

#### `inner`
A function that renders the inner children.
