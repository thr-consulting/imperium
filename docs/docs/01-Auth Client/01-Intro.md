## About
This is an Imperium client module providing authentication and authorization support for a web client.

The major parts of this package are:
* Imperium client module

The Imperium feature module tracks if a user is logged in. It also creates a cache for authorization information. The user
information is persisted in Local Storage. The authorization cache is persisted in an IndexedDB.

## Installation

### Add to client modules
In your `clientModules.ts` file:
```typescript
export function clientModules(): ImperiumClientModule[] {
    return [
        // ...other client modules	
        authClientModule(),
    ];
}
```
