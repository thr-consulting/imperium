/**
 * This webpack configuration is used when building the production client app.
 */
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const InlineChunkManifestHtmlWebpackPlugin = require('inline-chunk-manifest-html-webpack-plugin');

const iRoot = path.resolve(__dirname, '..');
const iSrcDir = path.join(iRoot, 'src');

const pRoot = path.resolve(process.cwd());
// const pSrcDir = path.join(pRoot, 'src', 'imperium');

const pBuildDir = path.join(pRoot, 'build');

const clientInclude = [iSrcDir];
const serverExclude = [path.join(iSrcDir, 'server')];

/* code can be: vendor-common, vendor-page-specific, meatier-common, meatier-page-specific
 * a small, fast landing page means only include the common from vendor + meatier
 * long-term caching means breaking apart meatier code from vendor code
 * The right balance in this case is to exclude material-ui from the vendor bundle
 * in order to keep the initial load small.
 * Cache vendor + app on a CDN and call it a day
 */

const vendor = [
	'@babel/polyfill',
	// 'react',
	// 'react-dom',
	// 'react-router-dom',
	// 'react-redux',
	// 'redux',
	// 'redux-immutablejs',
	// 'redux-thunk',
	'lodash',
	'immutable',
	// 'apollo-client',
	// 'react-apollo',
	// 'js-joda',
	// 'moment',
	// 'inputmask',
	// 'transit-js',
];

const initialClientConfig = {
	graphql: `${process.env.GRAPHQL_HOST}/api/graphql`,
	jwt_localstorage_name: process.env.JWT_LOCALSTORAGE_NAME,
};

const htmlOptions = {
	meta: {
		title: 'Imperium App',
		'mobile-web-app-capable': 'yes',
	},
	template: path.join(iSrcDir, 'client', 'index.html'),
	templateOptions: {
		initialConfig: JSON.stringify(initialClientConfig),
	},
};

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
	// resolve: {
	// 	extensions: ['.js'],
	// 	modules: [srcDir, 'node_modules'],
	// 	unsafeCache: true,
	// },
	optimization: {
		splitChunks: {
			// chunks: 'all',
			// minSize: 50000,
			cacheGroups: {
				vendor: {
					// test: /[\\/]node_modules[\\/]/,
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
		// minimize: false,
	},
	plugins: [
		new ProgressBarPlugin(),
		// new webpack.DefinePlugin({
		// 	__CLIENT__: true,
		// 	__PRODUCTION__: true,
		// 	'process.env.NODE_ENV': JSON.stringify('production'),
		// }),
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			analyzerPort: 8923,
			reportFilename: path.join('..', 'report.html'),
			openAnalyzer: false,
		}),
		new HtmlWebpackPlugin(htmlOptions),
		// new InlineChunkManifestHtmlWebpackPlugin(),
	],
	module: {
		rules: [
			// {test: /\.json$/, use: [{loader: 'json-loader'}]},
			// {test: /\.txt$/, use: [{loader: 'raw-loader'}]},
			// {
			// 	test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)(\?[a-z0-9=.]+)?$/,
			// 	use: [{loader: 'url-loader', options: {limit: 10000}}],
			// },
			// {test: /\.(wav|mp3)$/, use: [{loader: 'file-loader'}]},
			// {
			// 	test: /\.css$/,
			// 	exclude: /node_modules/,
			// 	use: [
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
			// 	exclude: /src/,
			// 	include: /node_modules/,
			// 	use: [
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
			// 	exclude: /node_modules/,
			// 	use: [{
			// 		loader: 'graphql-tag/loader',
			// 	}],
			// },
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
