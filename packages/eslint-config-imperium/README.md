# Imperium Eslint Configuration

You can use Imperium's specialized Eslint configuration in your own projects.

```bash
# yarn add eslint @imperium/eslint-config-imperium
```

Create a `.eslintrc` file:

```json
{
	"extends": "@imperium/eslint-config-imperium"
}
```

In your `package.json` file you can run the script:

```json
{
	"scripts": {
		"lint": "eslint --cache 'src/**/*.js'"
	}
}
```
