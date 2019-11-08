/* eslint-disable no-param-reassign */
import debug from 'debug';
import {SchemaDirectiveVisitor} from 'graphql-tools';
import {ApolloError} from 'apollo-client';
import {GraphQLField} from 'graphql';
import {permissionsMatch} from '../../checkPermissions';

const d = debug('imperium.graphql.HasPermissionDirective');

const notAuthenticatedError = (): ApolloError =>
	new ApolloError({
		errorMessage: 'Not authenticated',
		extraInfo: 'NO_AUTH',
	});

export default class HasPermissionDirective extends SchemaDirectiveVisitor {
	visitFieldDefinition(field: GraphQLField<any, any>) {
		const {req, authenticated} = this.args; // Directive parameters
		const {name, resolve} = field;

		field.resolve = async (...args) => {
			// Same fields as a resolver function (obj, params, ctx, info)
			const ctx = args[2];

			d(`${name} required permissions: ${req}`); // Required user permissions
			d(`${name} required authentication: ${authenticated}`); // Required authenticated?

			let userPermissions = [];
			let userAuthenticated = false;

			if (ctx.auth) {
				userPermissions = ctx.auth.permissions;
				userAuthenticated = !!ctx.auth.userId;
			}
			d(`${name}, user permissions: ${userPermissions}`); // Actual user permissions
			d(`${name}, user is authenticated: ${userAuthenticated}`); // Actual user is authenticated

			if (!req) {
				// No required permissions
				if (!authenticated || userAuthenticated) {
					// Does not require authentication or is authenticated
					d(`${name}, does not require authentication or is authenticated`);
					return resolve.apply(this, args);
				}
			} else if (userAuthenticated && permissionsMatch(userPermissions, req)) {
				// Requires permissions and they match AND user is authenticated
				d(`${name}, requires permissions and they match AND user is authenticated`);
				return resolve.apply(this, args);
			}

			d(`${name}, Not authorized or authenticated`);
			throw notAuthenticatedError();
		};
	}
}
