module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['jest', 'react-hooks'],
	extends: [
		'airbnb-typescript',
		'plugin:react/recommended',
		// Uses the recommended rules from the @typescript-eslint/eslint-plugin
		'plugin:@typescript-eslint/recommended',
		// Enables eslint-plugin-prettier and eslint-config-prettier. This will display prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
		'plugin:prettier/recommended',
	],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	env: {
		commonjs: true,
		es6: true,
		node: true,
		'jest/globals': true,
	},
	globals: {
		process: false,
		window: true,
		document: true,
	},
	rules: {
		// General
		'no-underscore-dangle': ['warn', {allowAfterThis: true, allow: ['_id']}],
		'class-methods-use-this': 'off',
		'global-require': 'error',
		'prefer-arrow-callback': ['error', {allowNamedFunctions: true}],
		'no-return-assign': ['error', 'except-parens'],
		'no-console': ['error'],
		'no-plusplus': 'off',
		'no-unused-vars': ['error', {varsIgnorePattern: 'd', argsIgnorePattern: 'server|context|ctx|type'}],
		// 'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: true}],
		'lines-between-class-members': ['off'],
		'no-use-before-define': ['off'],
		'func-names': ['error', 'always'],
		'no-alert': ['error'],

		// Typescript
		'@typescript-eslint/indent': ['off'],
		'@typescript-eslint/no-unused-vars': ['error', {varsIgnorePattern: 'd', argsIgnorePattern: 'server|context|ctx|type'}],
		'@typescript-eslint/no-unused-expressions': ['off'], // This was disabled because some upgrade to airbnb rules.
		'@typescript-eslint/explicit-member-accessibility': ['off'],
		'@typescript-eslint/explicit-function-return-type': ['off', {allowExpressions: true, allowTypedFunctionExpressions: true}],
		'@typescript-eslint/no-explicit-any': ['off'],
		'@typescript-eslint/ban-ts-ignore': ['off'],
		'@typescript-eslint/ban-ts-comment': ['off'],
		'@typescript-eslint/lines-between-class-members': ['off'],
		'@typescript-eslint/interface-name-prefix': ['off'],
		'@typescript-eslint/no-before-define': ['off'], // This was disabled to support optional chaining: https://github.com/typescript-eslint/typescript-eslint/issues/1116
		'@typescript-eslint/explicit-module-boundary-types': ['off'],

		// React
		// 'react/jsx-uses-react': ['off'], // Enable once typescript 4.1 launches
		// 'react/react-in-jsx-scope': ['off'], // Enable once typescript 4.1 launches
		'react/forbid-prop-types': 'error',
		'react/jsx-indent': ['off'],
		'react/jsx-indent-props': ['off'],
		'react/jsx-filename-extension': ['error', {extensions: ['.tsx']}],
		'react/require-default-props': 'off',
		'react/prefer-stateless-function': 'error',
		'react/no-unknown-property': ['error', {ignore: ['for']}],
		'react/no-unused-prop-types': 'off',
		'react/no-typos': 'off',
		'react/no-children-prop': 'off',
		'react/destructuring-assignment': ['off', 'always'],
		'react/jsx-curly-newline': ['off'],
		'react/jsx-one-expression-per-line': 'off',
		'react/jsx-props-no-spreading': ['off'],
		'react/jsx-wrap-multilines': ['off'],
		'react/display-name': ['off'],
		'react/prop-types': ['off'],

		// ES6 Import
		'import/no-extraneous-dependencies': 'off',
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		'import/extensions': 'off',
		'import/no-named-default': 'off',
		'import/no-default-export': 'off',

		// JSX a11y
		'jsx-a11y/label-has-for': 'off',
		'jsx-a11y/anchor-is-valid': 'off',
		'jsx-a11y/label-has-associated-control': 'off',

		// React Hooks
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
	},
};
