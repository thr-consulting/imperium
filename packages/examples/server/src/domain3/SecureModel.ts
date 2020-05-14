import debug from 'debug';
import type {Context} from './index';

const d = debug('imperium.example.server.SecureModel');

class SecureModel {
	static async canAccess() {

	}

	static async validateAccess(id: string, ctx: Context) {
		if (!ctx.auth) {

		}
	}

	static async getSecureData(id: string, ctx: Context) {
		await this.validateAccess(id, ctx);
		return `My Super Secure Data: ${id}`;
	}
}

export {SecureModel};
