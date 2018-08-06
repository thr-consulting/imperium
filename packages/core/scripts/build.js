/* eslint-disable no-console */
const {promisify} = require('es6-promisify');
const rimraf = promisify(require('rimraf'));
const webpack = require('webpack');
const serverConfig = require('../webpack/server.prod');
const clientConfig = require('../webpack/client.prod');

function output(err, stats) {
	if (err) {
		// console.log('1----');
		console.error(err.stack || err);
		if (err.details) {
			// console.log('2----');
			console.error(err.details);
		}
		return;
	}

	const info = stats.toJson();

	if (stats.hasErrors()) {
		// console.log('3----');
		info.errors.forEach(e => {
			console.error(e);
		});
		// console.error(info.errors);
	}

	if (stats.hasWarnings()) {
		// console.log('4----');
		console.warn(info.warnings);
	}
}

const buildClient = promisify((data, cb) => {
	console.log('>>> Building client');
	const clientCompiler = webpack(clientConfig);
	clientCompiler.run((err, stats) => {
		output(err, stats);
		cb();
	});
});

const buildServer = promisify((data, cb) => {
	console.log('>>> Building server');
	const serverCompiler = webpack(serverConfig);
	serverCompiler.run((err, stats) => {
		output(err, stats);
		cb();
	});
});

function complete() {
	console.log('>>> Build Complete!');
}

rimraf('build')
	.then(buildClient)
	.then(buildServer)
	.then(complete);
