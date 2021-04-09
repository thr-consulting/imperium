import {GraphQLError} from 'graphql/error';
import {GraphQLScalarType} from 'graphql/type';
import {Kind} from 'graphql/language';

export const GraphQLDecimal = new GraphQLScalarType({
	name: 'Decimal',
	description: 'Decimal',
	// Parses variable values (JSON => JSON)
	parseValue(value): number {
		return parseFloat(value);
	},
	// Called when the value is being sent to the client
	serialize(value): number {
		return parseFloat(value);
	},
	// Parses GraphQL language AST into the value. (AST => JSON)
	parseLiteral(ast): number {
		if (ast.kind === Kind.FLOAT || ast.kind === Kind.INT || ast.kind === Kind.STRING) return parseFloat(ast.value);
		throw new GraphQLError(`Cannot convert literal ${'value' in ast ? ast.value : ''} into Decimal.`);
	},
});
