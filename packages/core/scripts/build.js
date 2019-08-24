const util = require('util');
const rimraf = util.promisify(require('rimraf'));
const webpack = require('webpack');
const chalk = require('chalk');
const serverConfig = require('../webpack/server.prod');
const clientConfig = require('../webpack/client.prod');
const getConfig = require('./getConfig');

const {log, error, warn} = console;

const imperiumConfig = getConfig();

/**
 * Prints warnings and errors from webpack output
 * @param err
 * @param stats
 */
function printOutput(err, stats) {
	if (err) {
		// log(chalk.blue('1----'));
		error(chalk.bold.red(err.stack || err));
		if (err.details) {
			// log(chalk.blue('2----'));
			error(chalk.bold.red(err.details));
		}
		return;
	}

	const info = stats.toJson();

	if (stats.hasErrors()) {
		// log(chalk.blue('3----'));
		info.errors.forEach(e => error(chalk.bold.red(e)));
	}

	if (stats.hasWarnings()) {
		// log(chalk.blue('4----'));
		info.warnings.forEach(w => warn(chalk.bold.yellow(w)));
	}
}

/**
 * Builds the client
 */
const buildClient = util.promisify((data, cb) => {
	log(chalk.bold.green('>>> Building client'));
	const clientCompiler = webpack(clientConfig(imperiumConfig));
	clientCompiler.run((err, stats) => {
		printOutput(err, stats);
		cb();
	});
});

/**
 * Builds the server
 */
const buildServer = util.promisify((data, cb) => {
	log(chalk.bold.green('>>> Building server'));
	const serverCompiler = webpack(serverConfig(imperiumConfig));
	serverCompiler.run((err, stats) => {
		printOutput(err, stats);
		cb();
	});
});

/**
 * Prints completion message
 */
function complete() {
	log(chalk.bold.blue('>>> Build Complete!'));
}

log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='));
log(chalk.bold.white('  Imperium Framework - Build'));
log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='));

// Delete the build folder and start a new build
rimraf(imperiumConfig.build.path)
	.then(buildClient)
	.then(buildServer)
	.then(complete);
