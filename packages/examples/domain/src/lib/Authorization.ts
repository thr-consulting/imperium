import {Ability, AbilityTuple, CanParameters, RawRuleOf, RawRule} from '@casl/ability';
import {PackRule, packRules, permittedFieldsOf, unpackRules} from '@casl/ability/extra';

interface AuthorizationOpts<A extends AbilityTuple, U> {
	defineRulesFor: (user: U | null) => RawRuleOf<Ability<A>>[];
	getUserById: (id: string) => Promise<U | null>;
	setCache: (key: string, data: unknown, expire?: number) => Promise<typeof data>;
	getCache: (key: string) => Promise<unknown>;
}

/**
 * Typeguard to check if a value is an array of PackRules.
 * @param value
 */
function isPackedRules<T extends RawRule<never, never>>(value: unknown): value is PackRule<T>[] {
	const packRuleArr = value as PackRule<T>[];
	if (Array.isArray(packRuleArr)) {
		if (packRuleArr.length === 0) return true;
		const ret = packRuleArr.reduce((memo, packRule) => {
			if (!memo) return false;
			// I'm not fully checking to see if each array item of packRule complies with PackRule -mk
			return !!Array.isArray(packRule);
		}, false);
		return ret;
	}
	return false;
}

export class Authorization<A extends AbilityTuple, U> {
	public ability: Ability<A>;
	private readonly _id?: string;

	constructor(id?: string) {
		this._id = id;
		this.ability = new Ability<A>();
	}

	public async prepare({defineRulesFor, getUserById, getCache, setCache}: AuthorizationOpts<A, U>) {
		const cacheKey = `imp:auth:rules:${this._id}`;
		const packedRules = await getCache(cacheKey);
		if (packedRules && isPackedRules(packedRules)) {
			const unpackedRules = unpackRules(packedRules);
			this.ability = new Ability(unpackedRules);
			return;
		}

		if (this._id) {
			const u = await getUserById(this._id);
			const rules = defineRulesFor(u);
			await setCache(cacheKey, packRules(rules), 60);
			this.ability = new Ability<A>(rules);
		}
	}

	public throwUnlessCan(action: A[0], subject: A[1], field?: string | string[]) {
		if (Array.isArray(field)) {
			field.forEach(f => this.throwUnlessCan(action, subject, f));
			return;
		}
		// @ts-ignore I'm not sure what the correct Typescript is here as this has a lot to do with the complex typescript from the casl library. -mk
		const result = this.ability.can(action, subject, field);
		if (!result) throw new Error(`Unauthorized: ${action}`);
	}

	public can(...args: CanParameters<A>) {
		return this.ability.can(...args);
	}

	public permittedFieldsOf(action: A[0], subject: A[1]) {
		return permittedFieldsOf(this.ability, action, subject);
	}

	public get id(): string | undefined {
		return this._id;
	}
}
