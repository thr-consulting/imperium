## useAuthId
Returns an object with the following properties.

```typescript
	const {id, access, setAuth, getAuth} = useAuthId();
```

### id
Returns the logged-in users' id, or undefined if the user is not logged in.

```typescript
id: string | undefined
```

### access
The encoded JWT returned from the server. Usually stores the user id, issued and expired timestamps, along with any other
data passed from the server.

```typescript
access: string | undefined
```

### setAuth
A function that can be used to set the current logged-in user. This is usually used after something like a login operation.

```typescript
setAuth: (auth: IAuth | null) => void
```

### getAuth
A function that can be used to retrieve the current logged-in user.

```typescript
getAuth: () => Promise<IAuth | null>
```

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
Using an authorization selector (see @imperium/authorization) returns an object with authorization details.
The fields are:

```typescript
const {level, loading, id, hassAccess, useLazyAuth} = useAuth(selector: AbstractAuthSelector); 
```

### level: AuthLevel
The current access level based on the current user and the passed in selector. (See @imperium/authorization for more details.)

```typescript
level: AuthLevel
```

### loading
True if the authorization is still loading, otherwise false.

```typescript
loading: boolean
```

### id
The logged-in users' id, or undefined if the user is not logged in.

```typescript
id: string | undefined
```

### hasAccess
Returns a function that can be used to get an authorization result. (See @imperium/authorization for more details.)

```typescript
hasAccess: (lvl: AuthLevel, opts?: SyncHasAccessOptions) => SyncAuthorizationResult
```

## useLazyAuth
Using an authorization selector returns

```typescript
(selector: AbstractAuthSelector) 
```
