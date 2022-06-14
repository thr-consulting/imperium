import type {JsonValue, PermissionLookup} from '@imperium/authorization';
import debug from 'debug';

const d = debug('imperium.domaindriven.Domain');

export interface PermissionOpts {
	userId?: string;
	data?: JsonValue;
}
export type PermissionFn = (opts: PermissionOpts) => Promise<boolean>;

export interface Permissions {
	[key: string]: PermissionFn;
}

export interface DomainModule {
	permissions?: Permissions;
}

export interface DomainCon {
	modules: DomainModule[];
}

export class Domain<ExtraData> {
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

	permissionLookup: PermissionLookup<ExtraData> = async opts => {
		d('Calculating permissions');
		return Promise.all(
			opts.keys.map(async k => {
				if (this.#permissions[k.permission]) {
					const a = this.#permissions[k.permission];
					return a({userId: opts.authorization.id, data: k.data});
				}
				return false;
			}),
		);
	};
}
