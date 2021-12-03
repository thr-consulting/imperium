import debug from 'debug';
import type {AuthLevel} from './AuthLevel';

const d = debug('imperium.authorization.AsyncAuthorizationResult');

export interface AsyncHasAccessOptions {
	noThrow?: boolean;
	error?: Error;
}

type ConditionFunction = () => boolean | Promise<boolean>;
interface Condition {
	fn: ConditionFunction;
	type: 'and' | 'or';
}

export class AsyncAuthorizationResult {
	readonly #selectorLevelPromise: Promise<AuthLevel>;
	readonly #level: AuthLevel;
	#conditions: Condition[];
	#hasAccessOpts: AsyncHasAccessOptions;

	constructor(selectorLevel: Promise<AuthLevel>, level: AuthLevel, hasAccessOpts?: AsyncHasAccessOptions) {
		this.#selectorLevelPromise = selectorLevel;
		this.#level = level;
		this.#conditions = [];
		this.#hasAccessOpts = hasAccessOpts || {};
	}

	async exec(): Promise<boolean> {
		const selectorLevel = await this.#selectorLevelPromise;

		const selectorResult = selectorLevel.isHigher(this.#level) || selectorLevel.isEqual(this.#level);

		const result = await this.#conditions.reduce((memo, v) => {
			return memo.then(m => {
				return Promise.resolve(v.fn()).then(x => {
					switch (v.type) {
						case 'and':
							return m && x;
						case 'or':
							return m || x;
						default:
							throw new Error('Wrong condition type');
					}
				});
			});
		}, Promise.resolve(selectorResult));

		if (this.#hasAccessOpts.noThrow) return result;
		if (result) return true;
		if (this.#hasAccessOpts.error) throw this.#hasAccessOpts.error;
		throw new Error('Authorization error');
	}

	and(condition: ConditionFunction): AsyncAuthorizationResult {
		this.#conditions.push({type: 'and', fn: condition});
		return this;
	}

	or(condition: ConditionFunction): AsyncAuthorizationResult {
		this.#conditions.push({type: 'or', fn: condition});
		return this;
	}
}
