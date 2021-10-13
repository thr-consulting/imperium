import {GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID, GraphQLPassword} from 'graphql-custom-types';
import GraphQLObjectId from 'graphql-scalar-objectid';
import type {IResolvers} from '@graphql-tools/utils';
import type {DocumentNode} from 'graphql';
import {GraphQLLocalDate} from './GraphQLLocalDate';
import {GraphQLLocalTime} from './GraphQLLocalTime';
import {GraphQLMoney} from './GraphQLMoney';
import Root from './Root.graphqls';
import Scalars from './Scalars.graphqls';

export const schema: DocumentNode[] = [Scalars, Root];
export const resolvers: IResolvers = {
	// These root resolvers are here to fill in the root placeholders because we can't define an empty Query or Mutation
	Query: {
		root: (): string => 'root',
	},
	Mutation: {
		root: (): string => 'root',
	},
	Subscription: {
		root: (): string => 'root',
	},
	Email: GraphQLEmail,
	URL: GraphQLURL,
	DateTime: GraphQLDateTime,
	UUID: GraphQLUUID,
	Password: new GraphQLPassword(6, 64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890`~!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?', {
		mixedCase: true,
	}),
	LocalDate: GraphQLLocalDate,
	LocalTime: GraphQLLocalTime,
	Money: GraphQLMoney,
	ObjectId: GraphQLObjectId,
};
