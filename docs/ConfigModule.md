---
id: configModule
title: Config Module
sidebar_label: Config Module
---

An Imperium config module is a function that returns the following data structure.

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
