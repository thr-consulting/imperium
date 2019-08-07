---
id: core
title: @imperium/core
sidebar_label: core
---

[![Coverage_badge](../../docs/assets/coverage/core/coverage.svg)](assets/coverage/core/index.html) [![Greenkeeper badge](https://badges.greenkeeper.io/darkadept/imperium.svg)](https://greenkeeper.io/)

<a name="RouteDirector"></a>

## RouteDirector

* * *

<a name="new_RouteDirector_new"></a>

### new RouteDirector(props)

| Param |
| --- |
| props | 

The RouteDirector renders main routes, usually in a layout, based off of route objects.


* * *

<a name="mergeModuleRoutes"></a>

## mergeModuleRoutes(modules)

| Param |
| --- |
| modules | 

Merge module routes into a single array


* * *

<a name="mergeModuleFragments"></a>

## mergeModuleFragments(modules)

| Param |
| --- |
| modules | 

Merge module fragments into a single object


* * *

<a name="renderRoot"></a>

## renderRoot(Root, routes, fragments, startupData)

| Param |
| --- |
| Root | 
| routes | 
| fragments | 
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

## _default(app)

| Param |
| --- |
| app | 

HTTP GET Endpoint that offers up the client for download in a production setting.


* * *

<a name="contextMiddleware"></a>

## contextMiddleware(connectors, modules)

| Param |
| --- |
| connectors | 
| modules | 

Express middleware that creates the context (data models & auth info).

Adds .context to the req


* * *

