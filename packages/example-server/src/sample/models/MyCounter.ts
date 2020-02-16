// This is my "db"

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

export function MyCounterContext() {
	return {
		MyCounter,
	};
}
