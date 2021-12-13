import type {Permissions} from '../core/Domain';

const permissions: Permissions = {
	async getStuff({id, data}) {
		return true;
	},
	async getMore({id, data}) {
		return false;
	},
	async getPing({id, data}) {
		return true;
	},
	async getLoc({id, data}) {
		return false;
	},
};

export function auth() {
	return {
		permissions,
	};
}
