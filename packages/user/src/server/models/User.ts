import mongoose, {Document} from 'mongoose';

export interface IUser extends Document {
	email: string;
	name: string;
	roles: string[];
	services: {[key: string]: any};
}

/**
 *
 * @class User
 */
const userSchema = new mongoose.Schema({
	email: String,
	name: String,
	roles: [String],
	services: {},
});

userSchema.query.byEmail = function byEmail(email: string) {
	return this.where({
		email,
	});
};

userSchema.statics.getData = function getData(user: IUser) {
	return {
		id: user._id,
		basicInfo: {
			name: user.name,
			email: user.email,
		},
		servicesField: 'services',
		roles: user.roles,
	};
};

export default mongoose.model<IUser>('User', userSchema);
