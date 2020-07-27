import {Ability, AbilityTuple, CanParameters, RawRuleOf} from '@casl/ability';
import {packRules, permittedFieldsOf, unpackRules} from '@casl/ability/extra';

interface Authorization2Opts<A extends AbilityTuple, U> {
	defineRulesFor: (user: U | null) => RawRuleOf<Ability<A>>[];
	getUserById: (id: string) => Promise<U | null>;
	setCache: (key: string, data: any, expire?: number) => Promise<typeof data>;
	getCache: (key: string) => Promise<any>;
}

export class Authorization<A extends AbilityTuple, U> {
	public ability: Ability<A>;
	private readonly id?: string;

	constructor(id?: string) {
		this.id = id;
		this.ability = new Ability<A>();
	}

	public async prepare({defineRulesFor, getUserById, getCache, setCache}: Authorization2Opts<A, U>) {
		const cacheKey = `imp:auth:rules:${this.id}`;
		const packedRules = await getCache(cacheKey);
		if (packedRules) {
			const unpackedRules = unpackRules(packedRules);
			this.ability = new Ability(unpackedRules);
			return;
		}

		if (this.id) {
			const u = await getUserById(this.id);
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
		// @ts-ignore TODO I'm not sure what the correct Typescript is here.
		const result = this.ability.can(action, subject, field);
		if (!result) throw new Error(`Unauthorized: ${action}`);
	}

	public can(...args: CanParameters<A>) {
		return this.ability.can(...args);
	}

	public permittedFieldsOf(action: A[0], subject: A[1]) {
		return permittedFieldsOf(this.ability, action, subject);
	}
}
