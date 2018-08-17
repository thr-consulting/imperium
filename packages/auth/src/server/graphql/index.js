import Auth from './Auth.graphqls';

export const schema = Auth;

export const resolvers = {
	Mutation: {
		signIn(obj, {email, password}, ctx) {
			return ctx.models.Auth.signIn(email, password);
		},
	},
};
