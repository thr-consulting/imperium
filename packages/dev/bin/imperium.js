#!/usr/bin/env node
/* eslint-disable no-console,@typescript-eslint/no-var-requires */

/*
	Main Imperium script. Possible arguments are:

  imperium dev - Start development mode
  imperium build - Build production files
  imperium prod - Start production mode. (Files must be built first)

  This script should be called from the host project.
*/

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
	throw err;
});

const spawn = require('cross-spawn');

const args = process.argv.slice(2);
const scriptIndex = args.findIndex(
	x =>
		x === 'build-client' ||
		x === 'build-server' ||
		x === 'prod-client' ||
		x === 'prod-server' ||
		x === 'dev-client' ||
		x === 'dev-server',
);
const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

let cmd;
let arg;

switch (script) {
	case 'dev-server':
	case 'dev-client': {
		process.env.NODE_ENV = 'development';
		cmd = 'node';
		arg = nodeArgs.concat(require.resolve(`../scripts/${script}`)).concat(args.slice(scriptIndex + 1));
		break;
	}

	case 'prod-server':
	case 'prod-client': {
		process.env.NODE_ENV = 'production';
		cmd = 'node';
		arg = nodeArgs.concat(require.resolve(`../scripts/${script}`)).concat(args.slice(scriptIndex + 1));
		break;
	}

	case 'build-server':
	case 'build-client': {
		process.env.NODE_ENV = 'production';
		cmd = 'node';
		arg = nodeArgs.concat(require.resolve(`../scripts/${script}`)).concat(args.slice(scriptIndex + 1));
		break;
	}

	default:
		console.log(`Unknown script "${script}".`);
		console.log('Perhaps you need to update @imperium/dev?');
		break;
}

if (cmd) {
	const result = spawn.sync(cmd, arg, {stdio: 'inherit'});
	if (result.signal) {
		if (result.signal === 'SIGKILL') {
			console.log(
				'The build failed because the process exited too early. ' +
					'This probably means the system ran out of memory or someone called ' +
					'`kill -9` on the process.',
			);
		} else if (result.signal === 'SIGTERM') {
			console.log(
				'The build failed because the process exited too early. ' +
					'Someone might have called `kill` or `killall`, or the system could ' +
					'be shutting down.',
			);
		}
		process.exit(1);
	}
	if (result.error) console.log(result.error);
	process.exit(result.status);
}
