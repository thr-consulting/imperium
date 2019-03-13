import Auth from './Auth.graphqls';

export const schema = Auth;

export const resolvers = {
	Mutation: {
		logIn(obj, {email, password}, ctx) {
			return ctx.models.Auth.logIn(email, password);
		},
	},
};
