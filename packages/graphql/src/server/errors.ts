import {ApolloError} from 'apollo-server';

export const notAuthenticatedError = (): ApolloError => new ApolloError('Not authenticated', 'NO_AUTH');
export const notFoundError = (): ApolloError => new ApolloError('Not Found', 'NOT_FOUND');

export const notFoundErrorIfNull = (data: any): any => {
	if (data) return data;
	throw notFoundError();
};
