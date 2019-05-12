import mongoose from 'mongoose';
// import DataLoader from 'dataloader';
import uniq from 'lodash/uniq';
import debug from 'debug';

const d = debug('imperium.auth.Role');

/**
 *
 * @class Role
 */
const roleSchema = new mongoose.Schema({
	name: {type: String, required: true},
	permissions: [String],
});

roleSchema.statics.getPermissions = async function getPermissions(roles = []) {
	if (mongoose.connection.readyState !== 1) throw new Error('Mongoose isn\'t connected or @imperium/auth mongoose isn\'t the same as the app\'s mongoose');
	const perms = await this.find({name: {$in: roles}});
	return uniq(perms.reduce((memo, value) => {
		if (!value) return memo;
		return [...memo, ...value.permissions];
	}, []));
};

roleSchema.query.byName = function byName(name) {
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
