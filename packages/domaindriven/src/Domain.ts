import type {AuthenticationBase, JsonValue, PermissionLookup} from '@imperium/authorization';
import debug from 'debug';

const d = debug('imperium.domaindriven.Domain');

export interface PermissionOpts<Repositories> {
	userId?: string;
	data?: JsonValue;
	repos: Repositories;
}
export type PermissionFn<Repositories> = (opts: PermissionOpts<Repositories>) => Promise<boolean>;

export interface Permissions<Repositories> {
	[key: string]: PermissionFn<Repositories>;
}

export interface DomainModule<Repositories> {
	permissions?: Permissions<Repositories>;
}

export interface DomainCon<Repositories> {
	modules: DomainModule<Repositories>[];
	repositories: Repositories;
}

export class Domain<Extra extends AuthenticationBase, Repositories = any> {
	#permissions: Permissions<Repositories> = {};
	readonly #repositories: Repositories;

	constructor({modules, repositories}: DomainCon<Repositories>) {
		this.#repositories = repositories;
		modules.forEach(module => {
			if (module.permissions) {
				this.#permissions = {
					...this.#permissions,
					...module.permissions,
				};
			}
		});
	}

	permissionLookup: PermissionLookup<Extra> = async opts => {
		d('Calculating permissions');
		return Promise.all(
			opts.keys.map(async k => {
				if (this.#permissions[k.permission]) {
					const a = this.#permissions[k.permission];
					return a({userId: opts.authorization.extra?.auth?.id, data: k.data, repos: this.#repositories});
				}
				return false;
			}),
		);
	};
}
