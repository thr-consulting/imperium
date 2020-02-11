// This is my "db"
import {IImperiumServer} from '@imperium/server';

let counter = 0;

export default class MyCounter {
	static inc() {
		counter++;
		return counter;
	}

	static getCounter() {
		return counter;
	}
}

export function MyCounterContext(server: IImperiumServer) {
	return {
		MyCounter,
	};
}
