import {server} from './server';

export async function main() {
	return server.start({port: 4001});
}

export async function stop() {
	return server.stop();
}
