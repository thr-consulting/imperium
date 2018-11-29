[![Coverage_badge](../../docs/assets/coverage/auth/coverage.svg)](assets/coverage/auth/index.html) [![Greenkeeper badge](https://badges.greenkeeper.io/darkadept/imperium.svg)](https://greenkeeper.io/)

# Authentication
Imperium authentication is handled using a JWT. The user authentication middleware that
is baked into `@imperium/core`. Imperium also assumes that certain models and reducers are
available to adhere to a certain format. As long as these are available user authentication
will work.

You can use the `@imperium/auth` package to fulfill these needs but it is strongly opinionated
and relies on GraphQL and Mongo and that you create a Users model.

## Using @imperium/auth
When using the Imperium Auth package take the following into consideration.

### Server
The authentication object on the server looks like this:

```javascript
const auth = new Immutable.Map({
	userId: 'string-user-id',
	async user() {
		// Function that fetches and returns the current user object
		// It uses your Users model to determine basic user info.
		// Essentially it calls models.Users.getById
	},
	permissions: [
		'StringPermission'
	]
});
```

### Users model
Your `Users` model must have the following methods:

#### `getById(id)`
Get's a user by string ID.

#### `getBasicInfo(user)`
Takes a user object and returns the basic user info. Only include the bare minimum of information
here. ie. User ID, name, emails.

## Implementing your own authentication package
If you implement your own authentication package you will need to do the following:

### Auth model
You will need to create a model called `Auth` with the following methods:

#### `defaultAuth()`
This method must return an authentication object that is defaulted to blank.

#### `async buildAuthFromJwt(decodedJwt)`
This method must build an authentication object from decoded JWT information.

#### `async serializeAuth(auth)`
This method must take an authentication object and serialize it for transport to the client.
<a name="Auth"></a>

## Auth
Model class for authentication. Uses a Mongo `roles` collection and has an opinionated user object.


* [Auth](#Auth)

    * [new Auth(connection, ctx)](#new_Auth_new)

    * [.defaultAuth()](#Auth+defaultAuth)

    * [.buildAuthFromJwt(decodedJWT)](#Auth+buildAuthFromJwt)

    * [.serializeAuth(auth)](#Auth+serializeAuth)

    * [.signIn(email, password)](#Auth+signIn)

    * [.generateJwt(payload, options)](#Auth+generateJwt)

    * [.encryptPassword(password)](#Auth+encryptPassword)

    * [.getPermissions(roles)](#Auth+getPermissions)

    * [.createRole(name, permissions)](#Auth+createRole)

    * [.getByName(name)](#Auth+getByName)



* * *

<a name="new_Auth_new"></a>

### new Auth(connection, ctx)

| Param | Type | Description |
| --- | --- | --- |
| connection | <code>object</code> | The Mongo connection. |
| ctx | <code>object</code> | The Context object that this model belongs to. |

Creates a new Auth model.


* * *

<a name="Auth+defaultAuth"></a>

### *auth*.defaultAuth()
Returns a default (blank) authentication object (for server)

**Returns**: <code>Map</code> - An Immutable map of a blank authentication object.  

* * *

<a name="Auth+buildAuthFromJwt"></a>

### *auth*.buildAuthFromJwt(decodedJWT)

| Param |
| --- |
| decodedJWT | 

Builds an authentication object from a decoded JWT

**Returns**: <code>Promise.&lt;Map&gt;</code> - An Immutable map of the authentication object created from decoded JWT data.  

* * *

<a name="Auth+serializeAuth"></a>

### *auth*.serializeAuth(auth)

| Param | Type | Description |
| --- | --- | --- |
| auth | <code>Map</code> | The Immutable Map that will be serialized. |

Takes in an authentication object and serializes it for transport to the client.

**Returns**: <code>Promise.&lt;Map&gt;</code> - An Immutable map that can be serialized using Transit Immutable.  

* * *

<a name="Auth+signIn"></a>

### *auth*.signIn(email, password)

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | The email to sign in with. |
| password | <code>string</code> \| <code>object</code> | The password string/object to log in with. |

Attempts the sign in process.


* * *

<a name="Auth+generateJwt"></a>

### *auth*.generateJwt(payload, options)

| Param | Description |
| --- | --- |
| payload | Optional JWT claims |
| options | Optional JWT options |

Generate a JWT for the currently logged in user.


* * *

<a name="Auth+encryptPassword"></a>

### *auth*.encryptPassword(password)

| Param |
| --- |
| password | 

Encrypts a password


* * *

<a name="Auth+getPermissions"></a>

### *auth*.getPermissions(roles)

| Param |
| --- |
| roles | 

Gets the array of permissions from an array of roles


* * *

<a name="Auth+createRole"></a>

### *auth*.createRole(name, permissions)

| Param |
| --- |
| name | 
| permissions | 

Create a new role


* * *

<a name="Auth+getByName"></a>

### *auth*.getByName(name)

| Param |
| --- |
| name | 

Gets a role by name


* * *

<a name="signOut"></a>

## signOut(apolloClient, history)

| Param |
| --- |
| apolloClient | 
| history | 

Signs out the user.


* * *

<a name="validatePassword"></a>

## validatePassword(user, password)

| Param |
| --- |
| user | 
| password | 

Validates a user object and a password string/object.


* * *

