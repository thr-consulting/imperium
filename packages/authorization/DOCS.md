# Dependent

## @imperium/auth-server

Used in the authorization endpoint. An `Authorization` instance is expected on
the context object.

It uses:
  * `Authorization.stringToKey()`
  * `<instance>.can()`

## @imperium/domaindriven

* `AbstractController` stores a reference to an Authorization instance.
* `Domain` provides a function that can be used as a PermissionLookup function.
  * This also uses the `JsonValue` type. 
