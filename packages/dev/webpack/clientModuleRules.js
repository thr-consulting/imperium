const inspectLoader = require('./inspectLoader').default;

/* ************************************************************
	Common client webpack module rules
 ************************************************************** */

module.exports = [
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
	{
		test: /\.css$/,
		exclude: /node_modules/,
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
		exclude: /node_modules/,
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
];
