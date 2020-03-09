// This is my "db"
import debug from 'debug';
import {ContextManager} from '../../serverTypes';

const d = debug('app.Sample.MyCounter');

let counter = 0;

export default class MyCounter {
	static inc() {
		counter++;
		return counter;
	}

	static getCounter() {
		return counter;
	}

	static async getCounterSecured(ctx: ContextManager) {
		if (!ctx.auth.hasPermission(['sysadmin', 'perm1', 'perm2'])) {
			throw new Error('Unauthorized');
		}
		if (await ctx.auth.getCache(['Sample', 'MyCounter'])) {
			return counter;
		}
		d('Calculating complex permissions');
		await ctx.auth.setCache(['Sample', 'MyCounter'], true);
		return counter;
	}
}

export function MyCounterContext() {
	return {
		MyCounter,
	};
}
