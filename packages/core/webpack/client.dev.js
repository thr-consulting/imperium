/* eslint-disable import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires */
/**
 * This webpack configuration is used when running the development version of the client app.
 * The server portion calls Webpack, loads this config and starts the server.
 */
const path = require('path');
const compact = require('lodash/compact');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const inspectLoader = require('./inspectLoader').default;

// Webpack configuration
module.exports = function(imperiumConfig) {
	return {
		mode: 'development',
		devtool: 'eval',
		context: imperiumConfig.source.path,
		entry: {
			app: [
				// 'webpack-hot-middleware/client',
				imperiumConfig.source.clientIndex,
			],
		},
		output: {
			filename: 'app.js',
		},
		resolve: {
			extensions: ['.js', '.mjs', '.ts', '.tsx', '.d.ts'],
		},
		optimization: {
			minimize: false,
			noEmitOnErrors: true,
		},
		devServer: {
			quiet: true,
			stats: 'errors-warnings',
		},
		stats: 'errors-warnings',
		plugins: compact([
			new ProgressBarPlugin(),
			new HtmlWebpackPlugin({
				title: 'test',
				template: imperiumConfig.source.webTemplate,
			}),
		]),
		module: {
			rules: [
				{test: /\.txt$/, use: [inspectLoader('RAW'), {loader: 'raw-loader'}]},
				{
					test: /\.(woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
					use: [inspectLoader('URL-FONT'), {loader: 'url-loader', options: {limit: 10000}}],
				},
				{
					test: /\.(svg)(\?[a-z0-9=.]+)?$/,
					use: [inspectLoader('URL-SVG'), {loader: 'url-loader', options: {limit: 1}}],
				},
				{
					test: /\.(png|jpg|jpeg|gif)(\?[a-z0-9=.]+)?$/,
					use: [inspectLoader('URL-IMAGE'), {loader: 'url-loader', options: {limit: 10000}}],
				},
				{test: /\.(wav|mp3)$/, use: [inspectLoader('FILE-AUDIO'), {loader: 'file-loader'}]},
				// {
				// 	test: /\.css$/,
				// 	include: isSourceFile([iSrcDir, pSrcDir]),
				// 	use: [
				// 		// inspectLoader('CSS-MODULE'),
				// 		{loader: 'style-loader'},
				// 		{
				// 			loader: 'css-loader',
				// 			options: {
				// 				modules: true,
				// 				localIdentName: '[path][name]__[local]--[hash:base64:5]',
				// 			},
				// 		},
				// 	],
				// },
				// {
				// 	test: /\.css$/,
				// 	exclude: isSourceFile([iSrcDir, pSrcDir]),
				// 	use: [
				// 		// inspectLoader('CSS'),
				// 		{loader: 'style-loader'},
				// 		{
				// 			loader: 'css-loader',
				// 			options: {
				// 				modules: false,
				// 			},
				// 		},
				// 	],
				// },
				// {
				// 	test: /\.graphql$/,
				// 	include: isSourceFile([iSrcDir, pSrcDir]),
				// 	use: [
				// 		inspectLoader('CSS'),
				// 		{
				// 			loader: 'graphql-tag/loader',
				// 		},
				// 	],
				// },
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [
						inspectLoader('BABEL'),
						{
							loader: 'babel-loader',
							options: {
								babelrc: false,
								presets: [['@imperium/babel-preset-imperium', {client: true}]],
							},
						},
					],
				},
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: [
						inspectLoader('BABEL-TS'),
						{
							loader: 'babel-loader',
							options: {
								babelrc: false,
								presets: [['@imperium/babel-preset-imperium', {client: true, typescript: true}]],
							},
						},
					],
				},
				{
					test: /\.mjs$/,
					include: /node_modules/,
					type: 'javascript/auto',
				},
			],
		},
	};
};
