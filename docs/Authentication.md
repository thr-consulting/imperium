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
