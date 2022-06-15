import type {DomainModule, Permissions} from '@imperium/domaindriven';
import type {Repositories} from '../core/createRepositories';

const permissions: Permissions<Repositories> = {
	async getStuff() {
		return true;
	},
	async getMore() {
		return false;
	},
	async getPing() {
		return true;
	},
	async getLoc() {
		return false;
	},
};

export const authModule: DomainModule<Repositories> = {
	permissions,
};
