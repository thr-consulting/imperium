## useLogin
Returns a function that can be used to attempt a login.

```typescript
useLogin: (loginInfo: LoginInfo) => Promise<void>
```

### LoginInfo
An object used to pass login information to the server during a login operation. It contains an identifier (usually an email address),
an encoded password (usually with sha256), and a boolean used to tell the server to remember this device.

## useLogout
Returns a function that can be used to log a user out.

```typescript
useLogout: () => Promise<void>
```

## useAuth
Get authentication and authorization information for the current logged in user.

```typescript
const {id, authorization} = useAuth(); 
```

### id
The logged-in users' id, or undefined if the user is not logged in.

```typescript
id: string | undefined
```

### authorization
The current instance of the Authorization class, from @imperium/authorization.

```typescript
authorization: Authorization
```

## useCan
Query for a permission (or multiple permissions) and optional data.

There are multiple caches in the pipeline for requesting a permission. If the permission is not cached on the 
client, it is requested from the server.

1. In memory, LRU cache, with expiry and maximum items.
2. Longer term storage in IndexedDB, with expiry.
3. Per request memory cache on the server.
4. Longer term storage in Redis, with expiry.
5. Calculated by business logic.

```typescript
const [result, loading] = useCan('doStuff', {optional: 'data'});
```

### result
The boolean result of the permission check. If an array of permissions are requested, the result is the
logical AND of all permission checks. The result will be initially `false`, until it is finished loading.

```typescript
result: boolean
```

### loading
True if the permission is still being loaded, otherwise false.

```typescript
loading: boolean
```
