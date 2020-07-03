import {Ability, AbilityBuilder} from '@casl/ability';
import {permittedFieldsOf, rulesToQuery} from '@casl/ability/extra';
import debug from 'debug';
import type {AuthenticatedUser} from '@imperium/context-manager';
import type {Context} from '../index';
import type {User} from '../User';

const d = debug('imperium.examples.domain-advanced.Authorization');

type Actions = 'read' | 'update' | 'delete' | 'create' | 'manage';
type Entities = 'Photo' | 'Metadata' | 'Category' | 'User' | 'Comment' | 'SecureModel' | 'all';
type AppAbility = Ability<[Actions, Entities]>;

// TODO these are hardcoded here right now... maybe we should gather these permissions from feature module directories.
function defineAbilityFor(user?: User) {
	const {can, rules} = new AbilityBuilder<AppAbility>();

	if (user && user.services.roles.indexOf('admin') >= 0) {
		can('manage', 'all');
	}

	if (user?.id) {
		can('read', 'User', ['name', 'email'], {id: user.id}); // Can read own user
		can('read', 'User', ['name']); // Public fields

		can('read', 'Photo', {owner: user.id}); // Can read own photos
		can('read', 'Photo', ['name', 'public', 'metadata.location', 'categories.*', 'owner.*'], {public: true}); // Can read public photos

		can('read', 'Comment');

		can('read', 'SecureModel');
	}

	return new Ability(rules);
}

function symbolize(query) {
	return JSON.parse(JSON.stringify(query), function keyToSymbol(key, value) {
		if (key[0] === '$') {
			const symbol = `Op_${key.slice(1)}`;
			this[symbol] = value;
			return;
		}
		return value;
	});
}

function ruleToSql(rule) {
	return rule.inverted ? {$not: rule.conditions} : rule.conditions;
}

export class Authorization {
	private authenticatedUser?: AuthenticatedUser;
	private ability!: Ability; // TODO this probably needs to be a more specific type.

	constructor(authenticatedUser?: AuthenticatedUser) {
		this.authenticatedUser = authenticatedUser;
	}

	public async prepare(ctx: Context) {
		if (this.authenticatedUser?.auth?.id) {
			const user = await ctx.connectors.connections.pg.getRepository(ctx.context.User).findOne(this.authenticatedUser.auth.id);
			this.ability = defineAbilityFor(user);
		} else {
			this.ability = defineAbilityFor();
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

	public can(action: Actions, subject: any | Entities | undefined, field?: string | string[]): boolean {
		if (Array.isArray(field)) {
			return field.reduce<boolean>((m, f) => this.can(action, subject, f) || m, false);
		}
		return this.ability.can(action, subject, field);
	}

	public permittedFieldsOf(action: Actions, subject: any | Entities | undefined) {
		return permittedFieldsOf(this.ability, action, subject);
	}

	public rulesToQuery(action: Actions, subject: any | Entities | undefined) {
		const query = rulesToQuery(this.ability, action, subject, ruleToSql);
		return query === null ? query : symbolize(query);
	}
}
