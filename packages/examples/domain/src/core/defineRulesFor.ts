import debug from 'debug';
import {Ability, AbilityBuilder} from '@casl/ability';
import type {User} from '../user';

const d = debug('imperium.examples.domain.defineRulesFor');

type Actions = 'read' | 'update' | 'delete' | 'create' | 'manage';
type Entities = 'Photo' | 'Metadata' | 'Category' | 'User' | 'Comment' | 'SecureModel' | 'all';
export type AppAbilityTuple = [Actions, Entities];

export function defineRulesFor(user: User | null) {
	const {can, rules} = new AbilityBuilder<Ability<AppAbilityTuple>>();

	if (user && user.services.roles.indexOf('admin') >= 0) {
		can('manage', 'all');
	}

	if (user?.id) {
		can('read', 'User', ['email'], {id: user.id}); // Can read own user
		can('read', 'User', ['id', 'name']);

		can('read', 'Photo', {owner: user.id}); // Can read own photos
		can('read', 'Photo', ['name', 'public', 'metadata.location', 'categories.*', 'owner.*'], {public: true}); // Can read public photos

		can('read', 'Comment');

		can('read', 'SecureModel');
	}

	return rules;
}
