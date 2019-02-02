/* eslint-disable import/no-dynamic-require, global-require */
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
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const config = require('../config');
const htmlOptions = require('./htmlOptions');
const inspectLoader = require('./inspectLoader').default;
const isSourceFile = require('./isSourceFile');

// Determine main paths
const iRoot = path.join(__dirname, '..');
const iSrcDir = path.join(iRoot, 'src');
const pRoot = process.cwd();
const pSrcDir = path.join(pRoot, 'src');
const pDevBuildDir = path.join(pRoot, 'build-dev'); // This ends up being in MemoryFS, not the real filesystem.

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

const cssCopyPlugin = options.css ? new CopyWebpackPlugin(options.css.map(v => ({from: v, to: 'css/'}))) : null;
const assetsPlugin = options.css ? new HtmlWebpackIncludeAssetsPlugin({
	append: false,
	assets: options.css.map(v => `css/${path.basename(v)}`),
}) : null;

// Webpack configuration
module.exports = {
	mode: process.env.NODE_ENV,
	devtool: 'eval',
	context: iSrcDir,
	entry: {
		app: [
			// '@babel/polyfill',
			// 'react-hot-loader/patch',
			'webpack-hot-middleware/client',
			'./client/index.js',
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
			// These aliases are so we can 'dynamically' include code from our project
			clientModules$: path.join(pRoot, config.project.clientModules),
			routeDefaults$: path.join(pRoot, config.project.routeDefaults),
			rootRender$: path.join(pRoot, config.project.rootRender),
		},
	},
	plugins: compact([
		cssCopyPlugin,
		new HtmlWebpackPlugin(htmlOptions({iSrcDir, pRoot, options}, config)),
		assetsPlugin,
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			__CLIENT__: true,
			__PRODUCTION__: false,
			// 'process.env.NODE_ENV': JSON.stringify('development'),
		}),
		new HardSourceWebpackPlugin(),
		new webpack.NoEmitOnErrorsPlugin(),
	]),
	module: {
		rules: [
			{test: /\.txt$/, use: [{loader: 'raw-loader'}]},
			{
				test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
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
				test: /\.mjs$/,
				include: /node_modules/,
				type: 'javascript/auto',
			},
		],
	},
};
