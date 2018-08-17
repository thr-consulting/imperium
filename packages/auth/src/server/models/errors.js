import {ApolloError} from 'apollo-server';

export const userNotFoundError = () => new ApolloError('User not found', 'USER_NOT_FOUND');
export const incorrectPasswordError = () => new ApolloError('Incorrect password', 'INCORRECT_PASSWORD');
