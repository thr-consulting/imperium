import Auth from './Auth.graphqls';

export const schema = Auth;

export const resolvers = {
	Mutation: {
		logIn(obj, {email, password}, ctx) {
			return ctx.models.Auth.logIn(email, password);
		},
		forgotPassword(obj, {email}, ctx) {
			return ctx.models.Auth.forgotPassword(email);
		},
		signUp(obj, {email}, ctx) {
			if (process.env.SIGNUP_ENABLED) return ctx.models.Auth.signUp(email);
			throw new Error('Signup not allowed');
		},
	},
};
