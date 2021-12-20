## Concepts
* Routes are identified with a name (ie. `withParam` and `noParam` above).
* If you specify any route parameters you must also create a const string array in `params` matching the parameter names.

## defineRoutes
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

The `defineRoutes` function returns an object with the following keys:

```typescript
const {to, types, match, renderRouteProps} = routes;
```

### to
Functions that are used to create string paths to a specific route.
```typescript
  routes.to.noParam();
  // Returns '/noParam'

  routes.to.withParam({myParam: 'value'});
  // Returns '/param/value'
```

### types
Objects that are used to create typescript types. The values should not be used.
```typescript
  type A = typeof routes.type.noParam;
  // A = never

  type B = typeof routes.type.withParam;
  // B = {myParam: string}

  console.log(routes.type.withParam);
  // Will output: 'ERROR: Do not use route types as values'
```

### match
Functions that can be used to try and match a URL path with the routes parameters. Returns null if the URL doesn't match.
```typescript
  const match1 = routes.match.noParam('/willNotMatch');
  // match1 = null

  const match2 = routes.match.noParam('/noParam');
  // match2 = {}

  const match3 = routes.match.withParam('/param/value');
  // match3 = {myParam: 'value'}
```

### renderRouteProps
A function that can be used to create an array of React Router route props. (Used to render routes).
```typescript jsx
  const routeProps = routes.renderRouteProps({
    noParam: (nothing, routeComponentProps) => <div>A Component</div>,
    withParam: ({myParam}, routeComponentProps) => <div>A Component {myParam}</div>,
  });
```
