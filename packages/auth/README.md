[![Coverage_badge](../../docs/assets/coverage/auth/coverage.svg)](assets/coverage/auth/index.html) [![Greenkeeper badge](https://badges.greenkeeper.io/darkadept/imperium.svg)](https://greenkeeper.io/)

# Authentication
Imperium authentication is handled using a JWT. User authentication middleware is baked into 
`@imperium/core`. It assumes that certain models and reducers are available and that they adhere
to a certain API. As long as these are available user authentication will work.

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

### Client Permission Matching

#### `checkPermissions(auth, permissions): bool`

This method needs to check auth data (from your `serializeAuth()` method against an array of permissions.
This method needs to be available on the client and is NOT secure. It is used to prevent normal access
to routes.

## Using @imperium/auth
Instead of rolling your own authentication module, you can use the `@imperium/auth` package to
fulfill these needs but it is strongly opinionated and relies on GraphQL and Mongo and that you
create a Users model. When using the Imperium Auth package take the following into consideration.

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

