/* eslint-disable no-param-reassign */
// import debug from 'debug';
import {SchemaDirectiveVisitor} from 'graphql-tools';
import matchPermissions from './matchPermissions';
import {notAuthenticatedError} from '../errors';

// const d = debug('app:core:server:HasPermissionDirective');

export default class HasPermissionDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field) {
		const {req, authenticated} = this.args; // Directive parameters
		const {resolve} = field;

		// d('----------');
		// d(field); // graphql field info
		// d('----------');
		// d(details); // details.objectType === Query
		// d('----------');
		// d(this); // instance of this class
		// d('----------');

		field.resolve = async (...args) => { // Same fields as a resolver function (obj, params, ctx, info)
			const ctx = args[2];

			const userPermissions = ctx.auth.get('permissions');
			const userAuthenticated = !!ctx.auth.get('userId');

			// d(ctx);
			// d(info);
			// d(req);
			// d(authenticated);
			// d(userPermissions);
			// d(userAuthenticated);

			if (!req) { // No required permissions
				if (!authenticated || userAuthenticated) { // Does not require authentication or is authenticated
					return resolve.apply(this, args);
				}
			} else if (userAuthenticated && matchPermissions(userPermissions, req)) { // Requires permissions and they match AND user is authenticated
				return resolve.apply(this, args);
			}

			throw notAuthenticatedError();

			// d(`Has  : ${args[2].auth.get('permissions')}`);
			// d(`Needs: ${req}  Authenticated: ${authenticated}`);
			// return resolve.apply(this, args);
		};
	}
}
