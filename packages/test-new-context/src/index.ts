import {server} from './server';

export async function main() {
	return server.start({port: parseInt(process.env.port || '4001', 10)});
}

export async function stop() {
	return server.stop();
}
