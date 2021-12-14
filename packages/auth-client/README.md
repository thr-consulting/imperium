# @imperium/auth-client

[![Coverage_badge](../../docs/assets/coverage/auth-client/coverage.svg)](assets/coverage/auth-client/index.html)
[![GitHub tag](https://img.shields.io/github/tag/darkadept/imperium.svg)](https://github.com/darkadept/imperium/tags/)
[![GitHub issues](https://img.shields.io/github/issues/darkadept/imperium.svg)](https://github.com/darkadept/imperium/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/darkadept/imperium.svg)](https://GitHub.com/darkadept/imperium/pull/)

[![GitHub license](https://img.shields.io/github/license/darkadept/imperium.svg)](https://github.com/darkadept/imperium/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/darkadept/imperium.svg)](https://github.com/darkadept/imperium/graphs/contributors/)

# About
This is an Imperium client module providing authentication and authorization support for a web client.

The major parts of this package are:
  * Imperium client module

The Imperium feature module tracks if a user is logged in. It also creates a cache for authorization information. The user
information is persisted in Local Storage. The authorization cache is persisted in an IndexedDB.

# Environment Variables
These can be specified in a `.env` file in the client package. These are also not secret as they are included in the client build and available on the client.

|Variable|Default|Description|
|---|---|---|
|SERVER_PROTOCOL|'http'|What protocol the server is accessible at.|
|SERVER_HOST|'localhost'|What host the server is accessible at.|
|SERVER_PORT|4001|What port the server is accessible at.|
|AUTH_LOGIN_URL|'/api/login'|What the login endpoint is accessible at.|
|AUTH_REFRESH_URL|'/api/refresh'|What the refresh endpoint is accessible at.|
|AUTH_FORGOTPASSWORD_URL|'/api/forgot-password'|What the forgot password endpoint is accessible at.|
|AUTH_ACCESS_TOKEN_KEY|'access'|The local storage key that the access token is stored at.|
|AUTH_ID_KEY|'id'|The local storage key that the id is stored at.|

# Getting Started

## Add to client modules
In your `clientModules.ts` file:
```typescript
export function clientModules(): ImperiumClientModule[] {
    return [
        // ...other client modules	
        authClientModule(),
    ];
}
```

# Hooks

## `useAuthId()`
Returns an object with the following properties.

### `id: string | undefined`
Returns the logged-in users' id, or undefined if the user is not logged in.

### `access: string | undefined`
The encoded JWT returned from the server. Usually stores the user id, issued and expired timestamps, along with any other
data passed from the server.

### `setAuth(auth: IAuth | null)`
A function that can be used to set the current logged-in user. This is usually used after something like a login operation.

### `getAuth(): Promise<IAuth | null>`
A function that can be used to retrieve the current logged-in user.

## `useLogin(): (loginInfo: LoginInfo) => Promise<void>`
Returns a function that can be used to attempt a login.

### `LoginInfo`
An object used to pass login information to the server during a login operation. It contains an identifier (usually an email address),
an encoded password (usually with sha256), and a boolean used to tell the server to remember this device.

## `useLogout(): () => Promise<void>`
Returns a function that can be used to log a user out.

## `useAuth(selector: AbstractAuthSelector)`
Using an authorization selector (see @imperium/authorization) returns an object with authorization details.
The fields are:

### `level: AuthLevel`
The current access level based on the current user and the passed in selector. (See @imperium/authorization for more details.)

### `loading: boolean`
True if the authorization is still loading, otherwise false.

### `id: string | undefined`
The logged-in users' id, or undefined if the user is not logged in.

### `hasAccess: (lvl: AuthLevel, opts?: SyncHasAccessOptions) => SyncAuthorizationResult`
Returns a function that can be used to get an authorization result. (See @imperium/authorization for more details.)

## `useLazyAuth(selector: AbstractAuthSelector)`
Using an authorization selector returns 
