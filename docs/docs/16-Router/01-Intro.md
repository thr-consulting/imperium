## About
This is an Imperium client module for defining and using routes.

The major parts of this package are:
* Imperium client module
* `defineRoutes()` function
* `<ContentRouter>` component

## Installation

### Add to client modules
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

### Add routes to your feature index
In your feature `index.ts` file add routeProps.

```typescript
import {routeProps} from './routes.tsx';

export function feature(): ImperiumRouterClientModule {
  return {
    name: 'Feature',
    routeProps,
 };
}
```
