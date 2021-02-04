import debug from 'debug';
import type {AuthLevel} from './AuthLevel';

const d = debug('imperium.authorization.SyncAuthorizationResult');

export interface SyncHasAccessOptions {
	throw?: boolean;
	error?: Error;
}

type ConditionFunction = () => boolean;
interface Condition {
	fn: ConditionFunction;
	type: 'and' | 'or';
}

export class SyncAuthorizationResult {
	#selectorLevel: AuthLevel;
	#level: AuthLevel;
	#conditions: Condition[];
	#hasAccessOpts: SyncHasAccessOptions;

	constructor(selectorLevel: AuthLevel, level: AuthLevel, hasAccessOpts?: SyncHasAccessOptions) {
		this.#selectorLevel = selectorLevel;
		this.#level = level;
		this.#conditions = [];
		this.#hasAccessOpts = hasAccessOpts || {};
	}

	exec(): boolean {
		const selectorLevel = this.#selectorLevel;

		const selectorResult = selectorLevel.isHigher(this.#level) || selectorLevel.isEqual(this.#level);

		const result = this.#conditions.reduce((memo, v) => {
			const vRet = v.fn();
			switch (v.type) {
				case 'and':
					return memo && vRet;
				case 'or':
					return memo || vRet;
				default:
					throw new Error('Wrong condition type');
			}
		}, selectorResult);

		if (result) return true;
		if (this.#hasAccessOpts.throw) {
			if (this.#hasAccessOpts.error) {
				throw this.#hasAccessOpts.error;
			} else {
				throw new Error('Authorization error');
			}
		}
		return false;
	}

	and(condition: ConditionFunction): SyncAuthorizationResult {
		this.#conditions.push({type: 'and', fn: condition});
		return this;
	}

	or(condition: ConditionFunction): SyncAuthorizationResult {
		this.#conditions.push({type: 'or', fn: condition});
		return this;
	}
}
