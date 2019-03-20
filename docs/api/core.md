---
id: core
title: @imperium/core
sidebar_label: core
---

[![Coverage_badge](../../docs/assets/coverage/core/coverage.svg)](assets/coverage/core/index.html) [![Greenkeeper badge](https://badges.greenkeeper.io/darkadept/imperium.svg)](https://greenkeeper.io/)

<a name="Root"></a>

## Root
The root component


* * *

<a name="RouteDirector"></a>

## RouteDirector
RouteDirector - Component that manages multiple root routes, layouts, and permissions.


* * *

<a name="mergeModuleRoutes"></a>

## mergeModuleRoutes(modules)

| Param |
| --- |
| modules | 

Merge module routes into a single array


* * *

<a name="renderRoot"></a>

## renderRoot(Root, routes, startupData)

| Param |
| --- |
| Root | 
| routes | 
| startupData | 

Render the root component into the DOM


* * *

<a name="hmr"></a>

## hmr(app)

| Param |
| --- |
| app | 

Adds webpack-dev-middleware and HMR to the express app


* * *

<a name="readDevFile"></a>

## readDevFile(hmrInstance, file)

| Param |
| --- |
| hmrInstance | 
| file | 

Waits until webpack-dev-middleware is done compiling and then retrieves a file


* * *

<a name="createHtml"></a>

## createHtml(hmrInstance)

| Param |
| --- |
| hmrInstance | 

Function that returns an Express endpoint handler promise that renders our base client HTML.


* * *

<a name="_default"></a>

## _default(app, connectors, modules)

| Param |
| --- |
| app | 
| connectors | 
| modules | 

HTTP GET endpoint that sends the initial state to the client if the user is authorized.


* * *

<a name="_default"></a>

## _default(app)

| Param |
| --- |
| app | 

HTTP GET Endpoint that offers up the client for download in a production setting.


* * *

<a name="context"></a>

## context(connectors, modules)

| Param |
| --- |
| connectors | 
| modules | 

Express middleware that creates the context (data models & auth info).

Adds .context to the req


* * *

<a name="_default"></a>

## _default(tokenReqPath, secret)

| Param |
| --- |
| tokenReqPath | 
| secret | 

Express middleware that uses the Auth model and JWT to build authentication information.


* * *

