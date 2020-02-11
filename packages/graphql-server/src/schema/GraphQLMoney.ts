import {GraphQLError} from 'graphql/error';
import {GraphQLScalarType} from 'graphql/type';
import {Kind} from 'graphql/language';
import {toMoney} from '@thx/money';
import Money from 'js-money';

export const GraphQLMoney = new GraphQLScalarType({
	name: 'Money',
	description: 'JS-Money object',
	// Parses variable values (JSON => JSON)
	parseValue(value): Money {
		return toMoney(value);
	},
	// Called when the value is being sent to the client
	serialize(value): Money {
		return toMoney(value);
	},
	// Parses GraphQL language AST into the value. (AST => JSON)
	parseLiteral(ast): Money {
		if (ast.kind === Kind.FLOAT || ast.kind === Kind.INT || ast.kind === Kind.STRING) return toMoney(Number(ast.value));
		throw new GraphQLError(`Cannot convert literal ${'value' in ast ? ast.value : ''} into Money.`);
	},
});
