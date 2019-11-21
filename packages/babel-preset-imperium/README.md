# @imperium/babel-preset-imperium

[![Coverage_badge](../../docs/assets/coverage/babel-preset-imperium/coverage.svg)](assets/coverage/babel-preset-imperium/index.html)
[![GitHub tag](https://img.shields.io/github/tag/darkadept/imperium.svg)](https://github.com/darkadept/imperium/tags/)
[![GitHub issues](https://img.shields.io/github/issues/darkadept/imperium.svg)](https://github.com/darkadept/imperium/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/darkadept/imperium.svg)](https://GitHub.com/darkadept/imperium/pull/)

[![GitHub license](https://img.shields.io/github/license/darkadept/imperium.svg)](https://github.com/darkadept/imperium/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/darkadept/imperium.svg)](https://github.com/darkadept/imperium/graphs/contributors/)

This package includes the Babel preset used by [Imperium Framework](https://github.com/darkadept/imperium).

## Usage
Install the preset.

```bash
yarn add @imperium/babel-preset-imperium -D
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

#### `typescript`
`boolean`, defaults to `false`.

Enables the Typescript preset.

#### `graphqls`
`boolean`, defaults to `false`.

Enables including `*.graphqls` files using Babel.

#### `decorators`
`boolean`, defaults to `true`.

Enables support for decorators.
