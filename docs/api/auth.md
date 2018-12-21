---
id: auth
title: @imperium/auth
sidebar_label: auth
---

[![Coverage_badge](../../docs/assets/coverage/auth/coverage.svg)](assets/coverage/auth/index.html) [![Greenkeeper badge](https://badges.greenkeeper.io/darkadept/imperium.svg)](https://greenkeeper.io/)
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

<a name="checkPermissions"></a>

## checkPermissions(auth, needPermissions)

| Param | Description |
| --- | --- |
| auth | Must be an immutable auth object |
| needPermissions | Array or string of permissions |

Compares an auth object against a permission or list of permissions.


* * *

<a name="validatePassword"></a>

## validatePassword(user, password)

| Param |
| --- |
| user | 
| password | 

Validates a user object and a password string/object.


* * *

