import {LocalTime} from '@js-joda/core';
import {GraphQLError} from 'graphql/error';
import {Kind} from 'graphql/language';
import {GraphQLScalarType} from 'graphql/type';
import debug from 'debug';
import {toLocalTime, formatDate} from '@thx/date';

const d = debug('imperium.graphql-server.GraphQLLocalTime');

export const GraphQLLocalTime = new GraphQLScalarType({
	name: 'LocalTime',
	description: 'JS-Joda LocalTime',
	// Parses variable values (JSON => JSON) (value from client)
	parseValue(value): LocalTime {
		return toLocalTime(value);
	},
	// Called when the value is being sent to the client (value sent to the client)
	serialize(value): string {
		return formatDate(value, {time: true, date: false});
	},
	// Parses GraphQL language AST into the value. (AST => JSON)
	parseLiteral(ast): LocalTime {
		if (ast.kind === Kind.STRING) return toLocalTime(ast.value);
		throw new GraphQLError(`Cannot convert literal ${'value' in ast ? ast.value : ''} into LocalTime.`);
	},
});
