import MongoLoader from '@thx/mongoloader';
import isArray from 'lodash/isArray';
import randomId from '../../../lib/randomId';

export default class Users extends MongoLoader {
	constructor(connection, ctx) {
		super(connection, ctx, 'users');
	}

	/**
	 * Gets a user by id
	 * @param id
	 */
	getById(id) {
		return this.load(id);
	}

	/**
	 * Gets a user by email
	 * @param email
	 * @return {DataLoader<Promise|void, V> | DataLoader<K, V> | *}
	 */
	getByEmail(email) {
		return this.prime(this.findOne({'emails.address': email}));
	}

	/**
	 * Given a user object, return only the basic information needed in auth.
	 * Imperium/auth requires this for building authentication data.
	 * Note how we are mapping from _id to id and are generating the name.
	 * @param user
	 */
	getBasicInfo(user) {
		return {
			id: user._id, // eslint-disable-line no-underscore-dangle
			profile: {
				name: `${user.profile.firstName} ${user.profile.lastName}`.trim(),
				firstName: user.profile.firstName,
				lastName: user.profile.lastName,
			},
			emails: user.emails,
		};
	}

	/**
	 * Creates a user
	 * @param email
	 * @param password
	 * @param roles
	 * @param profile
	 * @param verified
	 * @return {Promise<{_id: *, username: *, profile: *, emails: *[], services: {password: {bcrypt: *}}}>}
	 */
	async createUser({email, password, roles}, profile, {verified = false} = {}) {
		const {Auth} = this.models;

		// TODO make sure email doesn't exist already

		const encryptedPassword = await Auth.encryptPassword(password);

		const user = {
			_id: randomId(),
			profile,
			emails: [{address: email, verified}],
			services: {password: {bcrypt: encryptedPassword}},
		};

		if (roles) {
			user.roles = isArray(roles) ? roles : [roles];
		}

		const {insertedCount} = await this.insertOne(user);
		if (insertedCount !== 1) throw new Error('Can\'t create user');

		return user;
	}
}
