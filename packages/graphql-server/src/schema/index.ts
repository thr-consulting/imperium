import type {IResolvers} from 'graphql-tools';
import {GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID} from 'graphql-custom-types';
import {GraphQLLocalDate} from './GraphQLLocalDate';
import {GraphQLMoney} from './GraphQLMoney';
import {GraphQLLocalTime} from './GraphQLLocalTime';
import Scalars from './Scalars.graphqls';
import Root from './Root.graphqls';

export const schema = [Scalars, Root];

export const resolvers: IResolvers = {
	// These root resolvers are here to fill in the root placeholders because we can't define an empty Query or Mutation
	Query: {
		root: () => 'root',
	},
	Mutation: {
		root: () => 'root',
	},
	Subscription: {
		root: () => 'root',
	},
	Email: GraphQLEmail,
	URL: GraphQLURL,
	DateTime: GraphQLDateTime,
	UUID: GraphQLUUID,
	LocalDate: GraphQLLocalDate,
	LocalTime: GraphQLLocalTime,
	Money: GraphQLMoney,
};
