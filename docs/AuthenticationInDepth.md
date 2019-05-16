# How Auth Works

## Actions
* Route authentication - On every express request (including graphql requests) we need to authenticate the user.
* Token refresh - Refresh the token when it expires.
* Log in - The user wants to log in.
* Log out - The user wants to log out.
* Sign up - The user wants to sign up.
* Confirm email - We need to confirm the email address.
* Forget password - The user forgot their password.
* Reset password - The user needs to reset their password (after a Forget password action).

## Definitions

* **Auth object** - (Defined by @imperium/core) On object representing the authenticated user. It can contain anything,
including methods (on the server), and usually contains userId, etc.
* **User basic info object** - (Defined by @imperium/auth) Data extracted from the user object that will be sent to the client.
It isn't public data, but will be sent over the wire when the user logs in. This object is a part
of the Auth object. It can contain whatever field you would like.

## Package Requirements

### Package: @imperium/auth

#### `initialState` endpoint
This Express endpoint sends a serialized state object to the client.

Requires:
* `Auth.serializeAuth(authObject)` - *[async]* passes an auth object and requires a JSON serializable
object in return. Needs to return a promise to the serializable object.

#### `userAuth` middleware
This is Express middleware that authenticates a JWT on the server.
This places a generated Auth object on the express request and on the current context.

Requires:
* `Auth.defaultAuth()` - needs to create blank authentication object.
* `Auth.buildAuthFromJwt(decodedJwt)` - *[async]* creates an auth object from a decoded JWT

#### `Auth.defaultAuth()` model method
This method needs to create a blank server auth object representing that no user is authenticated.

#### `Auth.buildAuthFromJwt()` model method *[async]*
Requires:
* `User.getById(id)` - *[async]* needs to get a user object by id.
* `User.getByEmail(email)` - *[async]* needs to a get a user object by email.
* `User.getData(user)` - needs to extract specific information from the user object.
  * Returns and object with these fields:
    * id - the user id
    * basicInfo - the user basic info object
    * password - encrypted password
    * roles - array of user roles

#### `Auth.serializeAuth(authObject)` model method *[async]*
This method needs convert the server auth object to a `JSON.serialize`-able object that will 
get sent to the client.

## Implementation of @imperium/auth
This is a deeper look at how the @imperium/auth package is implemented.

### JWT
These fields are required to be stored in the JWT.
* `id` - string id of user
* `roles` - array of user roles

### Server Auth Object
* `userId` - The string id of the user or null.
* `permissions` - Array of string permissions.
* `user()` - Async method that returns the user basic info object. This method will most likely have to
get the user from the database to build the user basic info object.

### Client Auth Object
* `userId` - The string id of the user or null.
* `permissions` - Array of string permissions available to the user.
* `user` - Basic user info object.

## How to access from Server
The server auth object is available on the context:

`const {userId} = ctx.auth;`

## How to access from Client
Use the React Context `AuthContextConsumer` and `AuthContextProvider` components to access
the auth object on the client.

Use the React Hook `useAuth()` to access the auth object on the client.

## Workflows

### Client startup (out of date) 
1. Client loads `index.tsx` from @imperium/core.
2. @imperium/auth `pre` function initiates fetch for initial state from server.
3. Server authenticates JWT using `userAuth` middleware.
4. `userAuth` middleware builds the server auth object using `Auth.defaultAuth()` and `Auth.buildAuthFromJwt()`
5. `userAuth` middleware adds the auth object to current context and request.
6. Server serializes auth object using `Auth.serializeAuth()` and returns it to the client.
7. Client receives the auth object and boots up react in `startFromState()`.
8. `startFromState()` calls all module startup functions, including Auth startup.
9. The Auth startup function returns the Auth object as startup data.
10. Startup data gets passed to `<Root>` as a prop.
11. The startup data gets passed as parameters to the `rootRender` function.
12. The `rootRender` function should render `AuthContextProvider` and pass the auth startup data as props.

### Login
1. Client runs `logIn` mutation, passing email and password digest.
2. Server gets user record and validated password.
3. Server signs an access token (JWT) and a refresh token (RJWT) and passes back an (client) Auth object.
