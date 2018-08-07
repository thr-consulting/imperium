const {promisify} = require('es6-promisify');
const rimraf = promisify(require('rimraf'));
const webpack = require('webpack');
const chalk = require('chalk');
const serverConfig = require('../webpack/server.prod');
const clientConfig = require('../webpack/client.prod');

const {log, error, warn} = console;

function output(err, stats) {
	if (err) {
		// log(chalk.blue('1----'));
		error(chalk.bold.red(err.stack || err))
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

const buildClient = promisify((data, cb) => {
	log(chalk.bold.green('>>> Building client'));
	const clientCompiler = webpack(clientConfig);
	clientCompiler.run((err, stats) => {
		output(err, stats);
		cb();
	});
});

const buildServer = promisify((data, cb) => {
	log(chalk.bold.green('>>> Building server'));
	const serverCompiler = webpack(serverConfig);
	serverCompiler.run((err, stats) => {
		output(err, stats);
		cb();
	});
});

function complete() {
	log(chalk.bold.blue('>>> Build Complete!'));
}

rimraf('build')
	.then(buildClient)
	.then(buildServer)
	.then(complete);
