---
id: configModule
title: Config Module
sidebar_label: Config Module
---

A module can provide extra configuration which let's you change the way Imperium sets things up.

```javascript
export default function MyModuleName() {
	return {
		// Required
		name, // [String] Name of the module

		// Core
		initialConfig, // [Object] Initial configuration
		webpack: {
			client: {
				rules, // Client webpack rules
			},
			server: {
				rules, // Server webpack rules
			},
		},
	};
}
```

## name
The string name of the module. You can import directly from the `package.json` file if you want.

```js
const {name} = require('./package.json');
```

## initialConfig

A JSON serializable object that is embedded in the HTML index file. This is used to pass hard-coded values
to the client. 

## webpack

Extra webpack configuration that is merged into the main Imperium webpack configuration.

```js
{
  webpack: {
    client: {
      rules: {
        // Place any webpack rules that will be used when compiling the client.
      },
    },
    server: {
      rules: {
        // Place any webpack rules that will be used when compiling the server.
      },
    },
  },
}
```
