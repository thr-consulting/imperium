---
id: main
title: Imperium React Framework
sidebar_label: Main
---

The Imperium framework requires a certain folder structure in order to be implemented.

The following files should be included in your `src/imperium` folder.

### `Connectors.js`
This file is used to export your data connectors. It should export a class with async `create()` and `close()` methods.
The `create()` method should return an object keyed by connector names.

```javascript
export default class Connectors {
	async create() {
		return {
			connectorName: ...
		};
	}
	
	async close() {
	}
}
```

### `serverModules.js`
Use this file to declare your server-side modules. Modules are functions that return an object. See [Server Modules](serverModule) for more details.

```javascript
export default [
	myModule,
];
```

### `clientModules.js`
Use this file to declare your client-side modules. Modules are functions that return an object. See [Client Modules](clientModule) for more details.

```javascript
export default [
	myModule,
];
```

### `routeDefaults.js`
Use this file to declare your root route and default route properties. See [Routes](routes) for more information.

```javascript
export const rootRoute = {};
export default {
	layout: MyLayout,
	redirect: true,
};
```

### `rootRender.js`
Use this file to inject wrapper components before the routes are rendered. Export a component that takes the following props:

  * `Child` - A component that will render the content routes. This component requires a `checkPermissions` prop passed to it. See [Authentication](authentication) for more details.
  * Any props passed from client module `startup()` functions. See [Client Modules](clientModule) for more details.

```javascript
export default function rootRender({Child}) {
	return (
		<MyWrapperComponent>
			<Child checkPermission={checkPermission}/>
		</MyWrapperComponent>
	)
}
```

### `htmlOptions.js`
Use this file to specify customization options for the HTML bundler. Export an object with some/all of the following options:

```js
module.exports = {
	semanticUiLink: '<link rel="stylesheet" href="..."/>', // An HTML link tag that overrides the default Semantic UI CDN
	title: 'My Application', // The HTML title attribute
	css: [], // Array of paths to CSS files that will be included in the HTML file
};
```
