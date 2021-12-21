## About
This is an Imperium client module providing an abstraction for page layout, menu items, and content.

The major parts of this package are:
* Imperium client module
* Main layout type: `LayoutData`
* `createPages()` function

## Installation

### Add to client modules
In your `clientModules.ts` file:
```typescript
export function clientModules(): ImperiumClientModule[] {
    return [
        // ...other client modules	
        layoutClientModule(),
    ];
}
```

### Add layout and pages to your feature index
In your feature `index.ts` file, add layout and pages (routeProps). Layout is not optional, but it can be an empty object.
Using `createPages()` is entirely optional.
```typescript
import {routeProps} from './pages.tsx';
import {layout} from './layout.tsx';

export function feature(): ImperiumLayoutClientModule & ImperiumRouterClientModule {
  return {
    name: 'Feature',
    layout,
    routeProps, // Use `routeProps` from `createPages()`
 };
}
```
