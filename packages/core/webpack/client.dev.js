/**
 * This webpack configuration is used when running the development version of the client app.
 * The server portion calls Webpack, loads this config and starts the server.
 */
const path = require('path');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Determine main paths
const iRoot = path.join(__dirname, '..');
const iSrcDir = path.join(iRoot, 'src');
const pRoot = process.cwd();
const pDevBuildDir = path.join(pRoot, 'build-dev');

const clientInclude = [iSrcDir];
const serverExclude = [path.join(iSrcDir, 'server')];

// This object is available on the client as window.__INITIAL_CONF__
const initialClientConfig = {
	graphql: `${process.env.GRAPHQL_HOST}/api/graphql`,
	jwt_localstorage_name: process.env.JWT_LOCALSTORAGE_NAME,
};

// Options for the HTML generation plugin
const htmlOptions = {
	meta: {
		title: `${process.env.APPNAME} - Development`,
		'mobile-web-app-capable': 'yes',
	},
	template: path.join(iSrcDir, 'client', 'index.html'),
	templateOptions: {
		initialConfig: JSON.stringify(initialClientConfig),
	},
};

// Webpack configuration
module.exports = {
	mode: process.env.NODE_ENV,
	devtool: 'eval',
	context: iSrcDir,
	entry: {
		app: [
			'@babel/polyfill',
			// 'react-hot-loader/patch',
			'./client/index.js',
			'webpack-hot-middleware/client',
		],
	},
	output: {
		filename: 'app.js',
		chunkFilename: '[name]_[chunkhash].js',
		// We build into the project build-dev dir. Normally webpack-dev-middleware doesn't write files but we need this for index.html generation.
		path: pDevBuildDir,
		publicPath: '/static/',
	},
	plugins: [
		new HtmlWebpackPlugin(htmlOptions),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin({
			__CLIENT__: true,
			__PRODUCTION__: false,
			// 'process.env.NODE_ENV': JSON.stringify('development'),
		}),
		new HardSourceWebpackPlugin(),
	],
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
				exclude: /node_modules/,
				use: [
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
				exclude: /src/,
				include: /node_modules/,
				use: [
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
				exclude: /node_modules/,
				use: [{
					loader: 'graphql-tag/loader',
				}],
			},
			{
				test: /\.js$/,
				use: [{
					loader: 'babel-loader',
					options: {
						babelrc: false,
						presets: [['@imperium/babel-preset-imperium', {client: true}]],
					},
				}],
				include: clientInclude,
				exclude: serverExclude,
			},
		],
	},
};
