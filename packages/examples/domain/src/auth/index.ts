import type {Permissions} from '../core/Domain';

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

export function auth() {
	return {
		permissions,
	};
}
