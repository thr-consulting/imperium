import {ApolloError} from 'apollo-server-errors';

export const InvalidHashAlgorithm = () =>
	new ApolloError('Invalid hash algorithm', 'INVALID_HASH_ALGORITHM', {httpStatusCode: 400});
export const UserNotFoundError = () => new ApolloError('User not found', 'USER_NOT_FOUND', {httpStatusCode: 404});
export const IncorrectPasswordError = () =>
	new ApolloError('Incorrect password', 'INCORRECT_PASSWORD', {httpStatusCode: 401});
export const TokenNotValid = () => new ApolloError('Token not valid', 'INVALID_TOKEN', {httpStatusCode: 401});
export const TokenExpired = () => new ApolloError('Token expired', 'EXPIRED_TOKEN', {httpStatusCode: 401});
export const TokenDeauthorized = () =>
	new ApolloError('Token deauthorized', 'DEAUTHORIZED_TOKEN', {httpStatusCode: 401});
export const TooManyLoginAttempts = () =>
	new ApolloError('Too many login attempts', 'LOGIN_ATTEMPTS_EXCEEDED', {httpStatusCode: 401});
