import {Ability, AbilityTupleType, AbilityTypes} from '@casl/ability';
import {packRules, permittedFieldsOf, unpackRules} from '@casl/ability/extra';
import type {AnyAbility, PureAbility, RawRuleOf} from '@casl/ability/dist/types/PureAbility';
import type {Abilities, CanParameters} from '@casl/ability/dist/types/types';
import debug from 'debug';
import type {Context} from '../index';

const d = debug('imperium.examples.domain-advanced.Authorization');

export class Authorization<U, A extends Ability> {
	private ability!: A;
	private readonly id?: string;
	private readonly defineRulesFor: (u?: U) => RawRuleOf<T>[];

	constructor(defineRulesFor: (u?: U) => RawRuleOf<T>[], id?: string) {
		this.id = id;
		this.defineRulesFor = defineRulesFor;
	}

	public async prepare(getU: (id: string) => Promise<U | undefined>, ctx: Context) {
		const cacheKey = `imp:auth:rules:${this.id}`;
		const packedRules = await ctx.connectors.connections.sharedCache.get(cacheKey);
		if (packedRules) {
			this.ability = new Ability(unpackRules(packedRules)) as T;
			return;
		}

		if (this.id) {
			const u = await getU(this.id);
			const rules = this.defineRulesFor(u);
			await ctx.connectors.connections.sharedCache.set(cacheKey, packRules(rules), 60);
			this.ability = (new Ability(rules) as unknown) as T;
		} else {
			this.ability = (new Ability() as unknown) as T;
		}
	}

	// TODO subject parameter also needs to take in an object instead of any
	public throwUnlessCan(action: Actions, subject: any | Entities | undefined, field?: string | string[]) {
		if (Array.isArray(field)) {
			field.forEach(f => this.throwUnlessCan(action, subject, f));
			return;
		}
		const result = this.ability.can(action, subject, field);
		if (!result) throw new Error(`Unauthorized: ${action}`);
	}

	// action: Actions, subject: any | Entities | undefined, field?: string | string[]
	public can(...args: CanParameters<A>): boolean {
		// if (Array.isArray(field)) {
		// 	return field.reduce<boolean>((m, f) => this.can(action, subject, f) || m, false);
		// }

		// this.ability.can()

		return this.ability.can(...args);
	}

	public permittedFieldsOf(action: Actions, subject: any | Entities | undefined) {
		return permittedFieldsOf(this.ability, action, subject);
	}
}
