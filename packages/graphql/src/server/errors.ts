import {ApolloError} from 'apollo-server';

export const notAuthenticatedError = () => new ApolloError('Not authenticated', 'NO_AUTH');
export const notFoundError = () => new ApolloError('Not Found', 'NOT_FOUND');

export const notFoundErrorIfNull = (data: any) => {
	if (data) return data;
	throw notFoundError();
};
