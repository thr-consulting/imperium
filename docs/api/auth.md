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

    * [.defaultAuth()](#Auth+defaultAuth)

    * [.buildAuthFromJwt(decodedJWT)](#Auth+buildAuthFromJwt)

    * [.serializeAuth(auth)](#Auth+serializeAuth)

    * [.signJwt(payload, options)](#Auth+signJwt)

    * [.encryptPassword(password)](#Auth+encryptPassword)

    * [.refreshToken(rtoken)](#Auth+refreshToken)

    * [.logIn(email, password)](#Auth+logIn)



* * *

<a name="Auth+defaultAuth"></a>

### *auth*.defaultAuth()
Returns a default (blank) authentication object (for server)


* * *

<a name="Auth+buildAuthFromJwt"></a>

### *auth*.buildAuthFromJwt(decodedJWT)

| Param |
| --- |
| decodedJWT | 

Builds an authentication object from a decoded JWT

**Returns**: <code>Promise.&lt;Object&gt;</code> - The authentication object created from decoded JWT data.  

* * *

<a name="Auth+serializeAuth"></a>

### *auth*.serializeAuth(auth)

| Param | Type | Description |
| --- | --- | --- |
| auth | <code>Object</code> | The object that will be serialized. |

Takes in an authentication object and serializes it for transport to the client.

**Returns**: <code>Promise.&lt;Object&gt;</code> - The object that can be serialized.  

* * *

<a name="Auth+signJwt"></a>

### *auth*.signJwt(payload, options)

| Param |
| --- |
| payload | 
| options | 

Creates a signed JWT from user data.


* * *

<a name="Auth+encryptPassword"></a>

### *auth*.encryptPassword(password)

| Param |
| --- |
| password | 

Encrypts a password


* * *

<a name="Auth+refreshToken"></a>

### *auth*.refreshToken(rtoken)

| Param | Type |
| --- | --- |
| rtoken | <code>string</code> | 

Takes a refresh token and creates a new access token


* * *

<a name="Auth+logIn"></a>

### *auth*.logIn(email, password)

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | The email to log in with. |
| password | <code>string</code> \| <code>object</code> | The password string/object to log in with. |

Attempts the log in process.


* * *

<a name="Role"></a>

## Role

* * *

<a name="checkPermissions"></a>

## checkPermissions(userPermissions, needPermissions, userId)

| Param | Description |
| --- | --- |
| userPermissions | Must be an auth object |
| needPermissions | Array or string of permissions |
| userId | The id of the user |

Compares an auth object against a permission or list of permissions.


* * *

<a name="userAuthMiddleware"></a>

## userAuthMiddleware(tokenReqPath, secret)

| Param |
| --- |
| tokenReqPath | 
| secret | 

Express middleware that uses the Auth model and JWT to build authentication information.


* * *

