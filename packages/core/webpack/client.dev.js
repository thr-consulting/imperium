/* eslint-disable import/no-dynamic-require, global-require, @typescript-eslint/no-var-requires */
/**
 * This webpack configuration is used when running the development version of the client app.
 * The server portion calls Webpack, loads this config and starts the server.
 */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const compact = require('lodash/compact');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const config = require('../config');
const htmlOptions = require('./htmlOptions');
const inspectLoader = require('./inspectLoader').default;
const isSourceFile = require('./isSourceFile');
const theme = require('./theme');

// Determine Imperium and Project roots
const iRoot = path.join(__dirname, '..');
const iSrcDir = path.join(iRoot, 'src');
const pRoot = process.cwd();
const pSrcDir = path.join(pRoot, 'src');
const pDevBuildDir = path.join(pRoot, 'build-dev'); // This ends up being in MemoryFS, not the real filesystem.

// Configure HTML options from config file if present
const htmlOptionsFile = path.join(pRoot, config.project.htmlOptions);
let options = { // Defaults
	semanticUiLink: '<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css"/>',
	title: `${process.env.APPNAME} - Development`,
};
if (fs.existsSync(htmlOptionsFile)) {
	options = {
		...options,
		...require(htmlOptionsFile),
	};
}

// Theme
const {themeCopyPlugin, themeAssetPlugin} = theme(options);

// Copy additional static assets
const assetCopyPlugin = new CopyWebpackPlugin([{from: path.resolve(pRoot, 'assets'), to: 'assets/'}]);

// Webpack configuration
module.exports = {
	mode: process.env.NODE_ENV,
	devtool: 'eval',
	context: iSrcDir,
	entry: {
		app: [
			'webpack-hot-middleware/client',
			'./client/index.tsx',
		],
	},
	output: {
		filename: 'app.js',
		chunkFilename: '[name]_[chunkhash].js',
		path: pDevBuildDir,
		publicPath: '/static/',
	},
	resolve: {
		alias: {
			// 'react-dom': '@hot-loader/react-dom',
			// These aliases are so we can 'dynamically' include code from our project
			clientModules$: path.join(pRoot, config.project.clientModules),
			routeDefaults$: path.join(pRoot, config.project.routeDefaults),
			rootRender$: path.join(pRoot, config.project.rootRender),

			// If you are developing Imperium with 'yarn link', enable these to use the same React libs as the project
			// react: path.resolve(pRoot, './node_modules/react'),
			// 'react-dom': path.resolve(pRoot, './node_modules/react-dom'),
		},
		extensions: ['.js', '.mjs', '.ts', '.tsx', '.d.ts'],
	},
	optimization: {
		minimize: false,
	},
	plugins: compact([
		new ProgressBarPlugin(),
		themeCopyPlugin,
		assetCopyPlugin,
		new HtmlWebpackPlugin(htmlOptions({iSrcDir, pRoot, options}, config)),
		themeAssetPlugin,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			__CLIENT__: true,
			__PRODUCTION__: false,
			// 'process.env.NODE_ENV': JSON.stringify('development'),
		}),
		new HardSourceWebpackPlugin({
			cacheDirectory: path.resolve(pRoot, 'node_modules', '.cache', 'hard-source'),
		}),
		new webpack.NoEmitOnErrorsPlugin(),
	]),
	module: {
		rules: [
			{test: /\.txt$/, use: [{loader: 'raw-loader'}]},
			{
				test: /\.(woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
				use: [{loader: 'url-loader', options: {limit: 10000}}],
			},
			{
				test: /\.(svg)(\?[a-z0-9=.]+)?$/,
				use: [{loader: 'url-loader', options: {limit: 1}}],
			},
			{
				test: /\.(png|jpg|jpeg|gif)(\?[a-z0-9=.]+)?$/,
				use: [{loader: 'url-loader', options: {limit: 10000}}],
			},
			{test: /\.(wav|mp3)$/, use: [{loader: 'file-loader'}]},
			{
				test: /\.css$/,
				include: isSourceFile([iSrcDir, pSrcDir]),
				use: [
					inspectLoader('CSS-MODULE'),
					{loader: 'style-loader'},
					{
						loader: 'css-loader',
						options: {
							modules: true,
							localIdentName: '[path][name]__[local]--[hash:base64:5]',
						},
					},
				],
			},
			{
				test: /\.css$/,
				exclude: isSourceFile([iSrcDir, pSrcDir]),
				use: [
					inspectLoader('CSS'),
					{loader: 'style-loader'},
					{
						loader: 'css-loader',
						options: {
							modules: false,
						},
					},
				],
			},
			{
				test: /\.graphqls?$/,
				include: isSourceFile([iSrcDir, pSrcDir]),
				use: [
					inspectLoader('CSS'),
					{
						loader: 'graphql-tag/loader',
					},
				],
			},
			{
				test: /\.js$/,
				include: isSourceFile([iSrcDir, pSrcDir]),
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
				include: isSourceFile([iSrcDir, pSrcDir]),
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
