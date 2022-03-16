import {toMoney} from '@thx/money';
import {GraphQLError, Kind, GraphQLScalarType} from 'graphql';
import type Money from 'js-money';

export const GraphQLMoney = new GraphQLScalarType<Money>({
	name: 'Money',
	description: 'JS-Money object',
	// Parses variable values (JSON => JSON)
	parseValue(value): Money {
		// @ts-ignore
		return toMoney(value);
	},
	// Called when the value is being sent to the client
	serialize(value): Money {
		// @ts-ignore
		return toMoney(value);
	},
	// Parses GraphQL language AST into the value. (AST => JSON)
	parseLiteral(ast): Money {
		if (ast.kind === Kind.FLOAT || ast.kind === Kind.INT || ast.kind === Kind.STRING) return toMoney(Number(ast.value));
		throw new GraphQLError(`Cannot convert literal ${'value' in ast ? ast.value : ''} into Money.`);
	},
});
