import {LocalDate} from '@js-joda/core';
import {toLocalDate, toEpochDay} from '@thx/date';
import debug from 'debug';
import {GraphQLError} from 'graphql/error';
import {Kind} from 'graphql/language';
import {GraphQLScalarType} from 'graphql/type';

const d = debug('imperium.graphql-server.schema.GraphQLLocalDate');

export const GraphQLLocalDate = new GraphQLScalarType<LocalDate, number>({
	name: 'LocalDate',
	description: 'JS-Joda LocalDate',
	// Parses variable values (JSON => JSON) (value from client)
	parseValue(value): LocalDate {
		return toLocalDate(value);
	},
	// Called when the value is being sent to the client (value sent to the client)
	serialize(value) {
		if (value instanceof LocalDate) return toEpochDay(value);
		if (typeof value === 'number') return value;
		throw new GraphQLError(`Cannot serialize LocalDate value: ${'value'}.`);
	},
	// Parses GraphQL language AST into the value. (AST => JSON)
	parseLiteral(ast): LocalDate {
		if (ast.kind === Kind.INT) return toLocalDate(parseInt(ast.value, 10));
		if (ast.kind === Kind.STRING) return toLocalDate(ast.value);
		throw new GraphQLError(`Cannot convert literal ${'value' in ast ? ast.value : ''} into LocalDate.`);
	},
});
