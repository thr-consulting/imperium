import type {JsonValue, PermissionLookup, Authorization} from '@imperium/authorization';
import type {AuthenticatedUser} from '@imperium/connector';

export interface PermissionOpts {
	id?: string;
	data?: JsonValue;
}
export type Permission = (opts: PermissionOpts) => Promise<boolean>;

export interface Permissions {
	[key: string]: Permission;
}

export interface DomainModule {
	permissions?: Permissions;
}

export interface DomainCon {
	modules: DomainModule[];
}

export class Domain {
	#permissions: Permissions = {};

	constructor({modules}: DomainCon) {
		modules.forEach(module => {
			if (module.permissions) {
				this.#permissions = {
					...this.#permissions,
					...module.permissions,
				};
			}
		});
	}

	permissionLookup: PermissionLookup<AuthenticatedUser> = async opts => {
		return Promise.all(
			opts.keys.map(async k => {
				if (this.#permissions[k.permission]) {
					return this.#permissions[k.permission]({id: opts.authorization.id, data: k.data});
				}
				return false;
			}),
		);
	};
}
