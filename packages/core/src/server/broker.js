import debug from 'debug';

const d = debug('imperium:core:broker');

function run() {
	d(`  >> Broker PID: ${process.pid}`);
}

export {
	run,
};
