import {IResolvers} from 'graphql-tools';
import {GraphQLEmail, GraphQLURL, GraphQLDateTime, GraphQLUUID, GraphQLPassword} from 'graphql-custom-types';
import GraphQLObjectId from 'graphql-scalar-objectid';
// @ts-ignore
import {
	GraphQLLocalDate,
	GraphQLMoment,
	// @ts-ignore
} from '@thx/date';
// @ts-ignore
import {GraphQLMoney} from '@thx/money';
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
	Password: new GraphQLPassword(6, 64, 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890`~!@#$%^&*()-_=+[{]}\\|;:\'",<.>/?', {
		mixedCase: true,
	}),
	LocalDate: GraphQLLocalDate,
	Moment: GraphQLMoment,
	Money: GraphQLMoney,
	ObjectId: GraphQLObjectId,
};
