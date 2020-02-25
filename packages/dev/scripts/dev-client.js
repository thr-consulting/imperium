/* eslint-disable no-console,@typescript-eslint/no-var-requires,global-require,import/no-dynamic-require */
// Common package imports
require('dotenv').config();
const d = require('debug')('imperium.dev.dev-client');
const chalk = require('chalk');
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const getConfig = require('./getConfig');

// Read the configuration
const imperiumConfig = getConfig();

// Display banner and info
console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='));
console.log(chalk.bold.white('  Imperium Framework - Development'));
console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='));
console.log(`Client port:        ${imperiumConfig.development.clientPort}`);
console.log('');

// Webpack Dev Server (for Client code)
const webpackConfig = require('../webpack/client.dev')(imperiumConfig);

const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, webpackConfig.devServer);
server.listen(parseInt(imperiumConfig.development.clientPort, 10), imperiumConfig.development.clientHost, () => {
	d(`Client webpack-dev-server started on port ${imperiumConfig.development.clientPort}`);
});
