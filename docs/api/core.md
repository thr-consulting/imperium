---
id: core
title: @imperium/core
sidebar_label: core
---

[![Coverage_badge](../../docs/assets/coverage/core/coverage.svg)](assets/coverage/core/index.html) [![Greenkeeper badge](https://badges.greenkeeper.io/darkadept/imperium.svg)](https://greenkeeper.io/)

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

