module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: [
		'@typescript-eslint',
		'react',
		'babel',
		'jest',
		'react-hooks',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:jest/recommended',
		'airbnb-typescript',
	],
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
	// 	// General
		'max-lines': ['warn', {max: 300, skipBlankLines: true, skipComments: true}],
		indent: ['error', 'tab', {SwitchCase: 1}],
		'no-tabs': 'off',
		'arrow-parens': ['error', 'as-needed'],
		'comma-dangle': ['error', 'always-multiline'],
		'no-underscore-dangle': ['warn', {allowAfterThis: true, allow: ['_id']}],
		'global-require': 'error',
		'generator-star-spacing': 0,
		'object-curly-spacing': ['error', 'never'],
		'object-curly-newline': ['error', {consistent: true}],
		'new-cap': 'warn',
		'prefer-arrow-callback': ['error', {allowNamedFunctions: true}],
		'class-methods-use-this': 'off',
		'max-len': ['error', {code: 200}],
		'space-before-function-paren': ['error', {anonymous: 'never', named: 'never', asyncArrow: 'always'}],
		'no-return-assign': ['error', 'except-parens'],
		'no-console': ['error'],
		'function-paren-newline': ['error', 'consistent'],
		'lines-between-class-members': ['error', 'always', {exceptAfterSingleLine: true}],
		'max-statements': ['warn', {max: 100}],
		'no-plusplus': 'off',
		'no-unused-vars': ['error', {varsIgnorePattern: 'd'}],

		// Typescript
		'@typescript-eslint/indent': ['error', 'tab', {SwitchCase: 1}],
		'@typescript-eslint/no-unused-vars': ['error', {varsIgnorePattern: 'd'}],
		'@typescript-eslint/member-delimiter-style': ['error', {
			multiline: {delimiter: 'comma', requireLast: true},
			singleline: {delimiter: 'comma', requireLast: false},
		}],
		'@typescript-eslint/explicit-member-accessibility': ['off'],
		'@typescript-eslint/explicit-function-return-type': ['off', {allowExpressions: true, allowTypedFunctionExpressions: true}],
		'@typescript-eslint/no-explicit-any': 'warn',

		// React
		'react/forbid-prop-types': 'error',
		'react/jsx-filename-extension': ['error', {extensions: ['.js', '.tsx']}],
		'react/jsx-indent': ['error', 'tab'],
		'react/jsx-indent-props': ['error', 'tab'],
		'react/jsx-tag-spacing': ['error', {beforeSelfClosing: 'never'}],
		'react/require-default-props': 'off',
		'react/prefer-stateless-function': 'error',
		'react/no-unknown-property': ['error', {ignore: ['for']}],
		'react/no-unused-prop-types': 'off',
		'react/no-typos': 'off',
		'react/no-children-prop': 'off',
		'react/destructuring-assignment': ['off', 'always'],
		'react/jsx-one-expression-per-line': ['off'],

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
	overrides: [
		// Typescript
		{
			files: ['**/*.ts', '**/*.tsx'],
			rules: {
				'no-undef': 'off',
			},
		},
	],
};
