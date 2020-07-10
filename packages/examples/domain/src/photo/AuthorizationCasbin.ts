import type {AuthenticatedUser} from '@imperium/context-manager';
import {newEnforcer} from 'casbin';
import type {Context} from '../index';

export class Authorization {
	private authenticatedUser?: AuthenticatedUser;

	constructor(authenticatedUser?: AuthenticatedUser) {
		this.authenticatedUser = authenticatedUser;
		const y = newEnforcer();
	}

	public async prepare(ctx: Context) {
	}
}
