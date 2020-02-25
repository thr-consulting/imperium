/* eslint-disable import/no-cycle */
// see: https://github.com/babel/babel/issues/10981
import {IImperiumServer} from '@imperium/server';
import OrderedDataLoader from '@thx/ordereddataloader';
import debug from 'debug';
import intersection from 'lodash/intersection';
import uniq from 'lodash/uniq';
import {Document, model, Schema, Types} from 'mongoose';
import {AuthContextManager} from '../types';

const d = debug('imperium.auth-server.Role');

export interface IRole extends Document {
	_id: Types.ObjectId;
	name: string;
	permissions: string[];
}

const roleSchema = new Schema({
	name: {type: String, required: true},
	permissions: [String],
});

const RoleModel = model<IRole>('Role', roleSchema);

export class Role {
	static createDataLoader(server: IImperiumServer) {
		return new OrderedDataLoader<string, IRole>(keys => RoleModel.find({_id: {$in: keys}}), {idField: '_id'});
	}

	static getByName(name: string, ctx: AuthContextManager) {
		return RoleModel.find({name});
	}

	static async getPermissions(roles: string[] = [], ctx: AuthContextManager): Promise<string[]> {
		const perms = await RoleModel.find({name: {$in: roles}});

		return uniq(
			perms.reduce((memo, value) => {
				if (!value) return memo;
				// @ts-ignore
				return [...memo, ...value.permissions];
			}, [] as string[]),
		);
	}

	static async getCachedPermissions(roles: string[], ctx: AuthContextManager): Promise<string[]> {
		const cacheConnectorKey = ctx.server.environment.authSharedCacheConnectorKey as string;

		// Get cached permissions. It will be an array of string arrays or null. ie. [ ['blah'], null, ['more'] ]
		// The null's mean the role is not cached.
		const cachedPermissions = (await ctx.server.connectors[cacheConnectorKey].hmget('permissions', roles)) as (string[] | null)[];

		// Determine missing roles and existing cached permissions
		const {missingRoles, permissions} = cachedPermissions.reduce<{missingRoles: string[]; permissions: string[]}>(
			(memo, v, index) => {
				if (v === null) {
					return {
						...memo,
						missingRoles: [...memo.missingRoles, roles[index]],
					};
				}
				return {
					...memo,
					permissions: [...memo.permissions, ...v],
				};
			},
			{missingRoles: [], permissions: []},
		);

		// Find and cache the missing roles
		if (missingRoles.length > 0) {
			// Fetch missing role's permissions from the DB (If missing roles don't exist we do NOT throw an error)
			const perms = await RoleModel.find({name: {$in: missingRoles}});

			// Cache the missing roles' permissions
			await Promise.all(
				perms.map(async v => {
					await ctx.server.connectors[cacheConnectorKey].hset('permissions', v.name, v.permissions);
				}),
			);

			// Set the entire key to expire
			const roleCacheExpires = ctx.server.environment.authRoleCacheExpires as number;
			await ctx.server.connectors[cacheConnectorKey].expire('permissions', roleCacheExpires);

			// Return unique permissions
			return uniq(
				perms.reduce<string[]>(
					(memo, value) => {
						if (!value) return memo;
						return [...memo, ...value.permissions];
					},
					[...permissions],
				),
			);
		}

		return uniq(permissions);
	}

	static async uncachePermissions(ctx: AuthContextManager) {
		const cacheConnectorKey = ctx.server.environment.authSharedCacheConnectorKey as string;
		await ctx.server.connectors[cacheConnectorKey].del('permissions');
	}

	static permissionsMatch(havePermissions: string | string[], needPermissions: string | string[]): boolean {
		const have = havePermissions instanceof Array ? havePermissions : [havePermissions];
		const need = needPermissions instanceof Array ? [...needPermissions] : [needPermissions];
		return intersection(have, need).length === need.length;
	}
}

export function RoleContext(server: IImperiumServer) {
	return {
		Role,
		RoleLoader: Role.createDataLoader(server),
	};
}
