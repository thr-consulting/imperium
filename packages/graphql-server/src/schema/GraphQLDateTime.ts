import {toDate} from '@thx/date';
import {GraphQLError, GraphQLScalarType, Kind} from 'graphql';

function normalizeDateString(dateStr: string): Date {
	// ISO compliance: replace ' ' with 'T' and '+00' with '+00:00'
	const isoStr = dateStr.replace(' ', 'T').replace(/\+(\d{2})$/, '+$1:00');

	const d = new Date(isoStr);
	if (Number.isNaN(d.getTime())) {
		throw new Error(`Invalid date: "${dateStr}" → "${isoStr}"`);
	}
	return d;
}
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
		if (typeof value === 'string') {
			const normalized = normalizeDateString(value);
			return normalized.getTime();
		}

		throw new GraphQLError(`Cannot serialize Date value: ${JSON.stringify(value)}`);
	},
	// Parses GraphQL language AST into the value. (AST => JSON)
	parseLiteral(ast): Date {
		if (ast.kind === Kind.INT) return toDate(parseInt(ast.value, 10));
		if (ast.kind === Kind.STRING) return toDate(ast.value);
		throw new GraphQLError(`Cannot convert literal ${'value' in ast ? ast.value : ''} into Date.`);
	},
});
