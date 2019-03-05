---
id: authentication
title: Authentication
sidebar_label: Authentication
---

Imperium authentication is handled using JWT. User authentication middleware hooks are baked into `@imperium/core`.
It assumes that the Auth model is present with the appropriate methods defined. On the client an AuthContext will
also need to be specified.

The default Imperium app required no authentication. 

## Implementing your own authentication package
If you implement your own authentication package you will need to do the following:

### Server

#### Auth model
You will need to create a model called `Auth` with the following methods:

##### `defaultAuth()`
This method must return an authentication object that is defaulted to blank.

##### `async buildAuthFromJwt(decodedJwt)`
This method must build an authentication object from decoded JWT information.

##### `async serializeAuth(auth)`
This method must take an authentication object and serialize it for transport to the client.

### Client

A React 16+ Context called AuthContext will need to be created. The auth object stored in the context
must follow a certain api as well in order for @thx/router:Reroute to work properly.

##### `AuthContext`

```js
export default React.createContext({ /* default auth object */ });
```

##### Authentication Object

This object must follow the following api:

```js
{
	checkPermissions(permissions) {
		// check permissions against stored user
		return {
			isAuthorized,
			isAuthenticated,
		};
	}
}
```

## Using @imperium/auth
Instead of rolling your own authentication module, you can use the `@imperium/auth` package to
fulfill these needs but it is strongly opinionated and relies on GraphQL and Mongo and that you
create a Users model. When using the Imperium Auth package take the following into consideration.

### Authentication Object
The authentication object looks like this:

```javascript
const auth = {
	userId: 'string-user-id',
	async user() {
		// Function that fetches and returns the current user object
		// It uses your Users model to determine basic user info.
		// Essentially it calls models.Users.getById
	},
	permissions: [
		'StringPermission'
	]
};
```

### Users model
Your `Users` model must have the following methods:

#### `getById(id)`
Get's a user by string ID.

#### `getBasicInfo(user)`
Takes a user object and returns the basic user info. Only include the bare minimum of information
here. ie. User ID, name, emails.

### GraphQL
A `User` graphql type must be defined 
