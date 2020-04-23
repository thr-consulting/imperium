import debug from 'debug';

const d = debug('imperium.main');

export async function main() {
	const noop = Function(); // eslint-disable-line no-new-func
	setInterval(noop, 10000);
}
