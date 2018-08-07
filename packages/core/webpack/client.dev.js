/**
 * This webpack configuration is used when running the development version of the client app.
 * When the development version is run, it uses babel-node and the .babelrc file to run the server portion.
 * The server portion calls Webpack, loads this config and starts the server.
 */
const path = require('path');
const webpack = require('webpack');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const root = path.join(__dirname, '..');
const srcDir = path.join(root, 'src');

const devBuildDir = path.join(process.cwd(), 'build-dev');

const clientInclude = [srcDir];
const serverExclude = [path.join(srcDir, 'server')];

const initialClientConfig = {
	graphql: `${process.env.GRAPHQL_HOST}/api/graphql`,
	jwt_localstorage_name: process.env.JWT_LOCALSTORAGE_NAME,
};

const htmlOptions = {
	meta: {
		title: 'Imperium App - Development',
		'mobile-web-app-capable': 'yes',
	},
	template: path.join(srcDir, 'client', 'index.html'),
	templateOptions: {
		initialConfig: JSON.stringify(initialClientConfig),
	},
};

module.exports = {
	mode: process.env.NODE_ENV,
	devtool: 'eval',
	context: srcDir,
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
		path: devBuildDir, // path.join(root, 'build'),
		publicPath: '/static/',
	},
	plugins: [
		new HtmlWebpackPlugin(htmlOptions),
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.DefinePlugin({
		// 	__CLIENT__: true,
		// 	__PRODUCTION__: false,
		// 	'process.env.NODE_ENV': JSON.stringify('development'),
		// }),
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
