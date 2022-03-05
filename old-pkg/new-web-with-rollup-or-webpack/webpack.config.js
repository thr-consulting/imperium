const fs = require('fs');
const {readFileSync} = fs;

const tsconfig = JSON.parse(readFileSync('./tsconfig.rollup.es6.json', 'utf-8'));

const config = {
	mode: 'development',
	devtool: 'source-map',
	entry: {
		app: './src/index.tsx',
	},
	output: {
		filename: 'app.js',
		publicPath: '/'
	},
	resolve: {
		extensions: ['.ts', '.tsx'],
	},
	optimization: {
		minimize: false,
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				loader: 'esbuild-loader',
				options: {
					loader: 'tsx',
					target: 'es6',
					tsconfigRaw: tsconfig,
				},
			},
		],
	},
};

module.exports = config;
