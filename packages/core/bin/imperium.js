#!/usr/bin/env node
/* eslint-disable no-console */

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on('unhandledRejection', err => {
	throw err;
});

const spawn = require('react-dev-utils/crossSpawn');

const args = process.argv.slice(2);

const scriptIndex = args.findIndex(
	x => x === 'build' || x === 'prod' || x === 'dev' || x === 'test'
);

const script = scriptIndex === -1 ? args[0] : args[scriptIndex];
const nodeArgs = scriptIndex > 0 ? args.slice(0, scriptIndex) : [];

switch (script) {
	case 'dev': {
		process.env.NODE_ENV = 'development';
		const cmd = 'node';
		const arg = nodeArgs
			.concat(require.resolve(`../scripts/${script}`))
			.concat(args.slice(scriptIndex + 1));

		const result = spawn.sync(cmd, arg, {stdio: 'inherit'});
		if (result.signal) {
			if (result.signal === 'SIGKILL') {
				console.log(
					'The build failed because the process exited too early. '
					+ 'This probably means the system ran out of memory or someone called '
					+ '`kill -9` on the process.'
				);
			} else if (result.signal === 'SIGTERM') {
				console.log(
					'The build failed because the process exited too early. '
					+ 'Someone might have called `kill` or `killall`, or the system could '
					+ 'be shutting down.'
				);
			}
			process.exit(1);
		}
		if (result.error) console.log(result.error);
		process.exit(result.status);
		break;
	}

	case 'prod': {
		process.env.NODE_ENV = 'production';
		const cmd = 'node';
		const arg = nodeArgs
			.concat(require.resolve(`../scripts/${script}`))
			.concat(args.slice(scriptIndex + 1));

		const result = spawn.sync(cmd, arg, {stdio: 'inherit'});
		if (result.signal) {
			if (result.signal === 'SIGKILL') {
				console.log(
					'The build failed because the process exited too early. '
					+ 'This probably means the system ran out of memory or someone called '
					+ '`kill -9` on the process.'
				);
			} else if (result.signal === 'SIGTERM') {
				console.log(
					'The build failed because the process exited too early. '
					+ 'Someone might have called `kill` or `killall`, or the system could '
					+ 'be shutting down.'
				);
			}
			process.exit(1);
		}
		if (result.error) console.log(result.error);
		process.exit(result.status);
		break;
	}

	default:
		console.log(`Unknown script "${script}".`);
		console.log('Perhaps you need to update @imperium/scripts?');
		break;
}
