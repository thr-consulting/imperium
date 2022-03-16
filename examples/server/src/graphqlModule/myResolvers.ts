const myResolvers = {
	Query: {
		async getData(/* obj, value, apolloContext */) {
			// The apollo context is technically different than imperium context but we spread imperium context across apollo context.
			// const data = apolloContext.scoreController
			// const fakeSecureData = apolloContext.SecureModel.getSecureData('secure-thing', apolloContext);
			// d(`Fake Secure Data: ${fakeSecureData}`);
			return 5;
		},
	},
};

export function resolvers() {
	return myResolvers;
}
