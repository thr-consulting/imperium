import type {DocumentNode} from 'graphql';
import type {IResolvers} from '@graphql-tools/utils';
import {GraphQLDateTime} from './GraphQLDateTime';
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
	DateTime: GraphQLDateTime,
	LocalDate: GraphQLLocalDate,
	LocalTime: GraphQLLocalTime,
	Money: GraphQLMoney,
};
