import {LocalDate} from '@js-joda/core';
import {toLocalDate, toEpochDay} from '@thx/date';
import debug from 'debug';
import {GraphQLError, Kind, GraphQLScalarType} from 'graphql';

const d = debug('imperium.graphql-server.schema.GraphQLLocalDate');

// Direct parser that won’t throw for plain ISO strings
function safeToLocalDate(value: any): LocalDate | null {
	try {
		if (value instanceof LocalDate) return value;
		if (typeof value === 'string') {
			// JS-Joda can parse plain YYYY-MM-DD
			return LocalDate.parse(value);
		}
		return toLocalDate(value);
	} catch {
		return null;
	}
}

export const GraphQLLocalDate = new GraphQLScalarType<LocalDate, number>({
	name: 'LocalDate',
	description: 'JS-Joda LocalDate',

	// Parses variable values (JSON => JSON) (value from client)
	parseValue(value): LocalDate {
		const date = safeToLocalDate(value);
		if (!date) throw new GraphQLError(`Invalid LocalDate input: ${JSON.stringify(value)}`);
		return date;
	},

	// Called when the value is being sent to the client (value sent to the client)
	serialize(value): number {
		const date = safeToLocalDate(value);
		if (date) return toEpochDay(date);
		if (typeof value === 'number') return value;

		d('Invalid LocalDate during serialize: %O', value);
		throw new GraphQLError(`Cannot serialize LocalDate value: ${JSON.stringify(value)}`);
	},

	// Parses GraphQL language AST into the value. (AST => JSON)
	parseLiteral(ast): LocalDate {
		if (ast.kind === Kind.INT) return toLocalDate(parseInt(ast.value, 10));
		if (ast.kind === Kind.STRING) {
			const parsed = safeToLocalDate(ast.value);
			if (!parsed) throw new GraphQLError(`Invalid LocalDate literal: ${ast.value}`);
			return parsed;
		}
		throw new GraphQLError(`Cannot convert literal ${'value' in ast ? ast.value : ''} into LocalDate.`);
	},
});
