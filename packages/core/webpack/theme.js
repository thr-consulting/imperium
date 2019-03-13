const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

module.exports = function theme(options) {
	let themeCopyPlugin;
	let themeAssetPlugin;
	if (options.theme) {
		const {css, assets} = options.theme;
		themeCopyPlugin = new CopyWebpackPlugin([
			...css.map(v => ({from: v, to: 'theme/'})),
			...assets.map(v => ({from: v, to: 'theme/'})),
		]);
		themeAssetPlugin = new HtmlWebpackIncludeAssetsPlugin({
			append: false,
			assets: css.map(v => `theme/${path.basename(v)}`),
		});
	}

	return {
		themeCopyPlugin,
		themeAssetPlugin,
	};
};
