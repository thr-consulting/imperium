/**
 * This webpack configuration is used when building the production client app.
 */
const path = require('path');
const webpack = require('webpack');
const compact = require('lodash/compact');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const InlineChunkWebpackPlugin = require('html-webpack-inline-chunk-plugin');
const config = require('../config');
const htmlOptions = require('./htmlOptions');
const inspectLoader = require('./inspectLoader').default;
const isSourceFile = require('./isSourceFile');

const iRoot = path.resolve(__dirname, '..');
const iSrcDir = path.join(iRoot, 'src');
const pRoot = path.resolve(process.cwd());
const pSrcDir = path.join(pRoot, 'src');
const pBuildDir = path.join(pRoot, config.production.buildDir);

const vendor = [
	// '@babel/polyfill',
	'react',
	'react-dom',
	'react-router-dom',
	'react-redux',
	'redux',
	'redux-immutablejs',
	'redux-thunk',
	'redux-logger',
	'lodash',
	'immutable',
	// 'apollo-client',
	// 'react-apollo',
	// 'js-joda',
	// 'moment',
	// 'inputmask',
	'debug',
	'transit-js',
	'transit-immutable-js',
	'jsonwebtoken',
	'whatwg-fetch',
];

// Webpack config
module.exports = {
	mode: process.env.NODE_ENV,
	context: iSrcDir,
	entry: {
		app: './client/index.js',
		vendor,
	},
	output: {
		filename: '[name]_[chunkhash].js',
		chunkFilename: '[name]_[chunkhash].js',
		path: path.join(pBuildDir, 'client'),
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
		minimize: config.production.minimize,
	},
	plugins: compact([
		process.env.DEBUG ? null : new ProgressBarPlugin(),
		new webpack.DefinePlugin({
			__CLIENT__: true,
			__PRODUCTION__: true,
			// 'process.env.NODE_ENV': JSON.stringify('production'),
		}),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			analyzerPort: 8923,
			reportFilename: path.join('..', config.production.reportFilename),
			openAnalyzer: false,
		}),
		new HtmlWebpackPlugin(htmlOptions(iSrcDir, config)),
		// new InlineChunkWebpackPlugin({inlineChunks: ['manifest']}),
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
				test: /\.graphql$/,
				include: isSourceFile([iSrcDir, pSrcDir]),
				use: [
					inspectLoader('GRAPHQLS'),
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
		],
	},
};
