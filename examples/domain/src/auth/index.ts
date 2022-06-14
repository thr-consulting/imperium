import type {DomainModule, Permissions} from '@imperium/domaindriven';

const permissions: Permissions = {
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

export const authModule: DomainModule = {
	permissions,
};
