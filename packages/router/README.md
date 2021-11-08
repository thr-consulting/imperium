# @imperium/router

[![Coverage_badge](../../docs/assets/coverage/router/coverage.svg)](assets/coverage/router/index.html)
[![GitHub tag](https://img.shields.io/github/tag/darkadept/imperium.svg)](https://github.com/darkadept/imperium/tags/)
[![GitHub issues](https://img.shields.io/github/issues/darkadept/imperium.svg)](https://github.com/darkadept/imperium/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/darkadept/imperium.svg)](https://GitHub.com/darkadept/imperium/pull/)

[![GitHub license](https://img.shields.io/github/license/darkadept/imperium.svg)](https://github.com/darkadept/imperium/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/darkadept/imperium.svg)](https://github.com/darkadept/imperium/graphs/contributors/)

# About
This is an Imperium client module for defining and using routes.

The major parts of this package are:
  * Imperium client module
  * `defineRoutes()` function
  * `<ContentRouter>` component

# Getting Started

## Add to client modules
In your `clientModules.ts` file:
```typescript
export function clientModules(): ImperiumClientModule[] {
    return [
        // ...other client modules	
        routerClientModule(),
    ];
}
```

In your `client.tsx` file, render the `<ContentRouter>` component (with optional errorBoundary component):
```typescript jsx
const client = new ImperiumClient({
  clientModules,
  render: props => {
    return <ContentRouter {...props} />; // Add this prop optionally: errorBoundary={ErrorBoundary}
  },
});
```

## Define routes in each feature
Usually in a `routes.ts` file in your feature:
```typescript
import {defineRoutes} from '@imperium/router';

export const routes = defineRoutes({
	withParam: {
		path: '/param/:myParam',
		params: ['myParam'] as const,
	},
	noParam: {
		path: '/noParam',
	},
});
```

In your feature `index.ts` file, add route props (see `renderRouteProps()` below).
```typescript
export function feature(): ImperiumRouterClientModule {
	return {
		name: 'Feature',
		routeProps,
	};
}
```

# Concepts
* Routes are identified with a name (ie. `withParam` and `noParam` above).
* If you specify any route parameters you must also create a const string array in `params` matching the parameter names.

# Usage
`defineRoutes` returns an object with the following keys:
```typescript
const {to, types, match, renderRouteProps} = routes;
```

## `to`
Functions that are used to create string paths to a specific route.
```typescript
  routes.to.noParam();
  // Returns '/noParam'

  routes.to.withParam({myParam: 'value'});
  // Returns '/param/value'
```

## `types`
Objects that are used to create typescript types. The values should not be used.
```typescript
  type A = typeof routes.type.noParam;
  // A = never

  type B = typeof routes.type.withParam;
  // B = {myParam: string}

  console.log(routes.type.withParam);
  // Will output: 'ERROR: Do not use route types as values'
```

## `match`
Functions that can be used to try and match a URL path with the routes parameters. Returns null if the URL doesn't match.
```typescript
  const match1 = routes.match.noParam('/willNotMatch');
  // match1 = null

  const match2 = routes.match.noParam('/noParam');
  // match2 = {}

  const match3 = routes.match.withParam('/param/value');
  // match3 = {myParam: 'value'}
```

## `renderRouteProps()`
A function that can be used to create an array of React Router route props. (Used to render routes).
```typescript jsx
  const routeProps = routes.renderRouteProps({
    noParam: (nothing, routeComponentProps) => <div>A Component</div>,
    withParam: ({myParam}, routeComponentProps) => <div>A Component {myParam}</div>,
  });
```
