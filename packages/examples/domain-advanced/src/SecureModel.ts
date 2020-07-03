import debug from 'debug';
import type {Context} from './index';

const d = debug('imperium.examples.domain-advanced.SecureModel');

/*
	This is an example of a plain domain model that uses auth to check who is making the
	request.

	The canAccess method isn't required, but is a useful design when checking permissions.
 */

class SecureModel {
	static async getSecureData(id: string, ctx: Context) {
		ctx.context.Authorization.throwUnlessCan('read', 'SecureModel');

		return `My Super Secure Data: ${id}`;
	}
}

export {SecureModel};
