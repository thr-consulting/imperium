import {type LocalTime} from '@js-joda/core';
import {toLocalTime} from '@thx/date';
import debug from 'debug';
import {GraphQLError, Kind, GraphQLScalarType} from 'graphql';

const d = debug('imperium.graphql-server.schema.GraphQLLocalTime');

export const GraphQLLocalTime = new GraphQLScalarType<LocalTime, number>({
	name: 'LocalTime',
	description: 'JS-Joda LocalTime serialized as seconds of day',

	// Parses variable values (JSON => JSON) (value from client)
	parseValue(value): LocalTime {
		return toLocalTime(value);
	},

	// Called when the value is being sent to the client (value sent to the client)
	serialize(value: unknown): number {
		try {
			if (typeof value === 'number') return value;
			return toLocalTime(value).toSecondOfDay();
		} catch (err: any) {
			d('Error serializing LocalTime: %O', err);
			throw new GraphQLError(`Cannot serialize LocalTime value: ${JSON.stringify(value)}`);
		}
	},

	// Parses GraphQL language AST into the value. (AST => JSON)
	parseLiteral(ast): LocalTime {
		if (ast.kind === Kind.STRING) return toLocalTime(ast.value);
		throw new GraphQLError(`Cannot convert literal ${'value' in ast ? ast.value : ''} into LocalTime.`);
	},
});
