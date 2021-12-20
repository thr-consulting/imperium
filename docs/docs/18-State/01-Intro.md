## About
This is an Imperium client module providing an abstraction for global state, based on Redux.

## Installation

### Add to client modules
In your `clientModules.ts` file:
```typescript
export function clientModules(): ImperiumClientModule[] {
    return [
        // ...other client modules	
        stateClientModule(),
    ];
}
```

### Add state slice to your feature index
In your feature `index.ts` file, add the state slice.
```typescript
import {state} from './state';

export function feature(): ImperiumStateClientModule {
  return {
    name: 'Feature',
    state,
 };
}
```
