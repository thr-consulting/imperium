module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['jest', 'react-hooks'],
	extends: [
		'airbnb-typescript',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		ecmaVersion: 2019,
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
		'no-unused-vars': ['error', {varsIgnorePattern: 'd', argsIgnorePattern: 'server|contextManager|ctx'}],
		'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: true}],

		// Typescript
		'@typescript-eslint/indent': ['off'],
		'@typescript-eslint/no-unused-vars': [
			'error',
			{varsIgnorePattern: 'd', argsIgnorePattern: 'server|contextManager|ctx'},
		],
		'@typescript-eslint/no-unused-expressions': ['off'], // This was disabled because some upgrade to airbnb rules.
		'@typescript-eslint/explicit-member-accessibility': ['off'],
		'@typescript-eslint/explicit-function-return-type': [
			'off',
			{allowExpressions: true, allowTypedFunctionExpressions: true},
		],
		'@typescript-eslint/no-explicit-any': 'warn',
		'@typescript-eslint/ban-ts-ignore': ['off'],
		'@typescript-eslint/interface-name-prefix': ['off'],

		// React
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

		// ES6 Import
		'import/no-extraneous-dependencies': 'off',
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		'import/extensions': 'off',

		// JSX a11y
		'jsx-a11y/label-has-for': 'off',
		'jsx-a11y/anchor-is-valid': 'off',
		'jsx-a11y/label-has-associated-control': 'off',

		// React Hooks
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
	},
};
