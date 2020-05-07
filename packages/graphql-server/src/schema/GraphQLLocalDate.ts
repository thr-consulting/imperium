import type {LocalDate} from '@js-joda/core';
import {GraphQLError} from 'graphql/error';
import {Kind} from 'graphql/language';
import {GraphQLScalarType} from 'graphql/type';
import debug from 'debug';
import {toLocalDate, toEpochDay} from '@thx/date';

const d = debug('imperium.graphql-server.GraphQLLocalDate');

export const GraphQLLocalDate = new GraphQLScalarType({
	name: 'LocalDate',
	description: 'JS-Joda LocalDate',
	// Parses variable values (JSON => JSON) (value from client)
	parseValue(value): LocalDate {
		return toLocalDate(value);
	},
	// Called when the value is being sent to the client (value sent to the client)
	serialize(value): number {
		return toEpochDay(value);
	},
	// Parses GraphQL language AST into the value. (AST => JSON)
	parseLiteral(ast): LocalDate {
		if (ast.kind === Kind.INT) return toLocalDate(parseInt(ast.value, 10));
		if (ast.kind === Kind.STRING) return toLocalDate(ast.value);
		throw new GraphQLError(`Cannot convert literal ${'value' in ast ? ast.value : ''} into LocalDate.`);
	},
});
