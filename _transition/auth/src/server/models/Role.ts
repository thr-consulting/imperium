import mongoose from 'mongoose';
import uniq from 'lodash/uniq';
import intersection from 'lodash/intersection';
import isArray from 'lodash/isArray';
import debug from 'debug';
import {SYSADMIN} from '../../../permissions';

const d = debug('imperium.auth.Role');

/**
 *
 * @class Role
 */
const roleSchema = new mongoose.Schema({
	name: {type: String, required: true},
	permissions: [String],
});

roleSchema.statics.getPermissions = async function getPermissions(roles: string[] = []) {
	if (mongoose.connection.readyState !== 1) {
		throw new Error("Mongoose isn't connected or @imperium/auth mongoose object isn't the same as the app's mongoose");
	}
	const perms = await this.find({name: {$in: roles}});
	return uniq(
		perms.reduce((memo: string[], value: {permissions: string[]}) => {
			if (!value) return memo;
			return [...memo, ...value.permissions];
		}, []),
	);
};

roleSchema.statics.permissionsMatch = function permissionsMatch(
	havePermissions: string | string[],
	needPermissions: string | string[],
): boolean {
	const have = isArray(havePermissions) ? havePermissions : [havePermissions];
	const need = isArray(needPermissions) ? [...needPermissions, SYSADMIN] : [needPermissions, SYSADMIN];
	return intersection(have, need).length > 0;
};

roleSchema.query.byName = function byName(name: string) {
	return this.where({name});
};

const Role = mongoose.model('Role', roleSchema);
export default Role;

// export const RoleLoader = () => new DataLoader(async keys => {
// 	const docs = await Role.find({_id: {$in: keys}});
// 	const docsMap = new Map();
// 	docs.forEach(doc => docsMap.set(doc._id.toString(), doc));
// 	return keys.map(key => docsMap.get(key.toString()) || undefined);
// });
