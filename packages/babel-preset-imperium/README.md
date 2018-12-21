---
id: babelpresetimperium
title: @imperium/babel-preset-imperium
sidebar_label: babel-preset-imperium
---

[![Coverage_badge](../../docs/assets/coverage/babel-preset-imperium/coverage.svg)](assets/coverage/babel-preset-imperium/index.html) [![Greenkeeper badge](https://badges.greenkeeper.io/darkadept/imperium.svg)](https://greenkeeper.io/)

This package includes the Babel preset used by [Imperium Framework](https://github.com/darkadept/imperium).

## Usage
Install the preset.

```js
yarn add @imperium/babel-preset-imperium -D
```

Create a .babelrc with the following:

```json
{
	"presets": ["@imperium/babel-preset-imperium"]
}
```

## Options

#### `client`
`boolean`, defaults to `false`.

If `true` uses Babel options for create javascript code that runs in a browser. If `false` creates
code that runs in Node.

#### `debug`
`boolean`, defaults to `false`,

See [babel-preset-env](https://babeljs.io/docs/en/babel-preset-env/#debug)'s debug option.

#### `forceModules`
`boolean`, defaults to `false`.

Normally module transformations are on (commonjs) for `client` mode and off for `server` mode.
This can force modules to be transformed.

#### `react`
`boolean`, defaults to `false`.

Enables the React preset, even on the server.
