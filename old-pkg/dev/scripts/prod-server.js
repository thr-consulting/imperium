/* eslint-disable no-console, @typescript-eslint/no-var-requires, @typescript-eslint/naming-convention */
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const child_process = require('child_process');
const os = require('os');

const rootPath = path.resolve(process.cwd());
const buildPath = path.resolve(rootPath, 'build', 'server');

if (!fs.existsSync(path.resolve(buildPath, 'index.js'))) {
	console.log('Production files are not built.');
	process.exit(1);
}

// Copy .env file
if (fs.existsSync(path.resolve(rootPath, '.env'))) {
	fs.copyFileSync(path.resolve(rootPath, '.env'), path.resolve(buildPath, '.env'));
} else {
	console.log(chalk.bold.redBright('Error: .env file not found in your project.'));
	process.exit(1);
}

function spawnSync(cmd, args, options) {
	child_process.spawnSync(cmd, args.split(' '), {encoding: 'utf-8', stdio: 'inherit', ...options});
}

// Display banner and info
console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='));
console.log(chalk.bold.white('  Imperium Framework - Production'));
console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='));
console.log(`Master process PID: ${process.pid}`);
console.log(`Number of workers:  ${process.env.PROCESSES || os.cpus().length}`);
console.log('');
spawnSync('node', 'index.js', {cwd: buildPath});
