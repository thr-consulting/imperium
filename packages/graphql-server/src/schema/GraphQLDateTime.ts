import {toDate} from '@thx/date';
import debug from 'debug';
import {GraphQLError, GraphQLScalarType, Kind} from 'graphql';

const d = debug('imperium.graphql-server.schema.GraphQLDateTime');

export const GraphQLDateTime = new GraphQLScalarType<Date, number>({
	name: 'DateTime',
	description: 'JS Date',
	// Parses variable values (JSON => JSON) (value from client)
	parseValue(value): Date {
		return toDate(value);
	},
	// Called when the value is being sent to the client (value sent to the client)
	serialize(value) {
		if (value instanceof Date) return value.getTime();
		if (typeof value === 'number') return value;
		throw new GraphQLError(`Cannot serialize Date value: ${'value'}.`);
	},
	// Parses GraphQL language AST into the value. (AST => JSON)
	parseLiteral(ast): Date {
		if (ast.kind === Kind.INT) return toDate(parseInt(ast.value, 10));
		if (ast.kind === Kind.STRING) return toDate(ast.value);
		throw new GraphQLError(`Cannot convert literal ${'value' in ast ? ast.value : ''} into Date.`);
	},
});
