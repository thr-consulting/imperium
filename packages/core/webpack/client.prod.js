/* eslint-disable import/no-dynamic-require, global-require */
/**
 * This webpack configuration is used when building the production client app.
 */
const path = require('path');
const compact = require('lodash/compact');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const inspectLoader = require('./inspectLoader').default;

// Webpack configuration
module.exports = function(imperiumConfig) {
	return {
		mode: 'production',
		context: imperiumConfig.source.path,
		devtool: imperiumConfig.build.client.devtool,
		entry: {
			app: imperiumConfig.source.clientIndex,
			vendor: imperiumConfig.build.client.vendorChunk,
		},
		output: {
			filename: '[name]_[chunkhash].js',
			chunkFilename: '[name]_[chunkhash].js',
			path: path.join(imperiumConfig.build.path, 'client'),
			// publicPath: '/static/',
		},
		resolve: {
			extensions: ['.js', '.mjs', '.ts', '.tsx', '.d.ts'],
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: 'vendor',
						name: 'vendor',
						chunks: 'all',
						enforce: true,
					},
				},
			},
			runtimeChunk: {
				name: 'manifest',
			},
			minimize: imperiumConfig.build.client.minimize,
		},
		plugins: compact([
			process.env.DEBUG ? null : new ProgressBarPlugin(),
			new BundleAnalyzerPlugin({
				analyzerMode: 'static',
				analyzerPort: 8923,
				reportFilename: path.join('..', 'report-client.html'),
				openAnalyzer: false,
			}),
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
					use: [inspectLoader('URL-FONT'), {loader: 'url-loader', options: {limit: 10000}},
					],
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
				// 		inspectLoader('CSS-MODULE'),
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
				// 		inspectLoader('CSS'),
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
				// 		inspectLoader('GRAPHQLS'),
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
