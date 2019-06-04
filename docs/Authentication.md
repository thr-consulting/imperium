---
id: authentication
title: Authentication
sidebar_label: Authentication
---

# This is out of date!

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
`RouteDirector`, a component in `@thx/router` is used to render multiple routes. It assumes that your are storing
the user info in a React 16+ context. `RouteDirector` requires a context consumer that returns a `checkPermissions` function.

```js
function checkPermissions(requiredPermissions) {
	return {
		isAuthenticated: true,
		isAuthorized: true,
	};
}
```

## Using @imperium/auth
Instead of rolling your own authentication module, you can use the `@imperium/auth` package to
fulfill these needs but it is strongly opinionated and relies on GraphQL and Mongo and that you
create a Users model. When using the Imperium Auth package take the following into consideration.

### Authentication Object
The server authentication object looks like this:
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

The client authentication object looks like this:
```javascript
const auth = {
	userId: 'string-user-id',
	user = {
		/* user info */
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

#### `getByEmail(id)`
Get's a user by email address.

#### `getBasicInfo(user)`
Takes a user object and returns the basic user info. Only include the bare minimum of information
here. ie. User ID, name, emails. (This is sent to the client)

### GraphQL
A `User` graphql type must be defined 

### Auth Provider
You must render the `AuthContextProvider` component and pass down the `AuthContextConsumer` in your `rootRender.js` file.

```js
import React from 'react';
import {AuthContextProvider, AuthContextProvider} from '@imperium/auth';

export default function rootRender({Child, auth}) {
	return (
		<AuthContextProvider auth={auth}>
			<Child AuthContextConsumer={AuthContextConsumer}/>
		</AuthContextProvider>
	);
}
```

### Theme
You can provide a background to the login window by adding the following file to your project:

`<project_root>/assets/imperium/auth/login.jpg`
