// eslint-disable no-console

if (process.env.NODE_ENV === 'production') {
	const main = require('./dist/index.js');
	main.main();
} else {
	require('@babel/register')({
		presets: [['@imperium/babel-preset-imperium', {client: false, typescript: true}]],
		extensions: ['.js', '.ts'],
		ignore: [/node_modules/],
		only: [
			filepath => {
				return true;
			},
		],
	});

	const main = require('./src/index');
	main.main();

	// Exit when SIGINT sent
	process.on('SIGINT', () => {
		console.log('\n'); // eslint-disable-line no-console
		console.log('Caught interrupt signal, shutting down');
		main.stop();
		process.exit(0);
	});

	// Catch uncaught exceptions
	process.on('uncaughtException', error => {
		console.error('Fatal: Uncaught exception', error);
		process.exit(3);
	});

	// Catch unhandled rejections
	process.on('unhandledRejection', error => {
		console.error('Fatal: Unhandled promise rejection', error);
		process.exit(4);
	});
}
