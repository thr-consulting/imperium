# @imperium/eslint-config-imperium

[![Coverage_badge](../../docs/assets/coverage/client/coverage.svg)](assets/coverage/client/index.html)
[![GitHub tag](https://img.shields.io/github/tag/darkadept/imperium.svg)](https://github.com/darkadept/imperium/tags/)
[![GitHub issues](https://img.shields.io/github/issues/darkadept/imperium.svg)](https://github.com/darkadept/imperium/issues/)
[![GitHub pull-requests](https://img.shields.io/github/issues-pr/darkadept/imperium.svg)](https://GitHub.com/darkadept/imperium/pull/)

[![GitHub license](https://img.shields.io/github/license/darkadept/imperium.svg)](https://github.com/darkadept/imperium/blob/master/LICENSE)
[![GitHub contributors](https://img.shields.io/github/contributors/darkadept/imperium.svg)](https://github.com/darkadept/imperium/graphs/contributors/)

You can use Imperium's specialized Eslint configuration in your own projects.

## Usage

Install the preset.

```bash
# yarn add eslint @imperium/eslint-config-imperium -D
```

Create a `.eslintrc.js` file with the following:

```js
module.exports = {extends: ['@imperium/eslint-config-imperium']};
```

In your `package.json` file you can run the script:

```json
{
	"scripts": {
		"lint": "eslint --cache --ext js,ts,tsx src"
	}
}
```
