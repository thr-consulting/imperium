// import {mergeTypes} from 'merge-graphql-schemas';
import property from 'lodash/property';
import User from './User.graphqls';

export const schema = User;

// console.log(User);

export const resolvers = {
	User: {
		id: property('_id'),
	},
	Profile: {
		name: obj => `${obj.firstName} ${obj.lastName}`.trim(),
	},
	Query: {
		getUser(obj, {id}, ctx) {
			return ctx.models.Users.getById(id);
		},
	},
	Mutation: {
		createUser(obj, {name, email, password}, ctx) {
			return ctx.models.Users.createUser({email, password}, name);
		},
		createContact(obj, {data}, ctx) {
			return ctx.models.Users.createContact(data);
		},
		saveUserInfo(obj, {data, id, path, index}, ctx) {
			return ctx.models.Users.saveUserInfo(data, id, path, index);
		},
		removeContactArrayItem(obj, {id, path, index}, ctx) {
			return ctx.models.Users.removeContactArrayItem(id, path, index);
		},
		updateName(obj, {data, id}, ctx) {
			return ctx.models.Users.updateName(data, id);
		},
		saveAddress(obj, {data, index, id, path}, ctx) {
			return ctx.models.Users.saveUserInfo(data, index, id, path);
		},
	},
};
