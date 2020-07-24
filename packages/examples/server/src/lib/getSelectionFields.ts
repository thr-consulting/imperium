import {ASTNode, FieldNode, GraphQLResolveInfo, Kind, OperationDefinitionNode, SelectionNode, ValueNode, FragmentDefinitionNode} from 'graphql';

export interface Hash<T> {
	[key: string]: T;
}

export interface Selection {
	arguments?: Hash<{name: string; value: any}>;
	children?: Hash<Selection>;
}

export interface FieldNodeInfo {
	fieldNodes: FieldNode[];
	fieldName: string;
	fragments: {[key: string]: FragmentDefinitionNode};
}

function flattenFields(input: Selection) {
	if (input.children) {
		return Object.keys(input.children).reduce((memo, key) => {
			const child = input.children ? input.children[key] : {};
			const childChildren = child.children ? child.children : [];
			if (Object.keys(childChildren).length > 0) {
				memo.push(...flattenFields(child).map(v => `${key}.${v}`));
			} else {
				memo.push(key.toString());
			}
			return memo;
		}, [] as string[]);
	}
	return [];
}

function isFragment(ast: ASTNode) {
	return ast.kind === 'InlineFragment' || ast.kind === 'FragmentSpread';
}

function getAST(ast: ASTNode, info: GraphQLResolveInfo | FieldNodeInfo) {
	if (ast.kind === 'FragmentSpread') {
		const fragmentName = ast.name.value;
		return info.fragments[fragmentName];
	}
	return ast;
}

/**
 * Utility function for converting ast values based on their
 * GraphQL type
 * @param ast
 */
function parseLiteral(ast: ValueNode): any {
	switch (ast.kind) {
		case Kind.STRING:
		case Kind.BOOLEAN:
			return ast.value;
		case Kind.INT:
		case Kind.FLOAT:
			return parseFloat(ast.value);
		case Kind.OBJECT: {
			const value = Object.create(null);
			ast.fields.forEach(field => {
				value[field.name.value] = parseLiteral(field.value);
			});
			return value;
		}
		case Kind.LIST:
			return ast.values.map(parseLiteral);
		default:
			return null;
	}
}

function getSelections(ast: OperationDefinitionNode): ReadonlyArray<SelectionNode> {
	if (ast && ast.selectionSet && ast.selectionSet.selections && ast.selectionSet.selections.length) {
		return ast.selectionSet.selections;
	}
	return [];
}

function flattenAST(ast: ASTNode, info: GraphQLResolveInfo | FieldNodeInfo, obj: Hash<Selection> = {}): Hash<Selection> {
	return getSelections(ast as OperationDefinitionNode).reduce((flattened, n) => {
		if (isFragment(n)) {
			// eslint-disable-next-line no-param-reassign
			flattened = flattenAST(getAST(n, info), info, flattened);
		} else {
			const node: FieldNode = n as FieldNode;
			const name = (node as FieldNode).name.value;
			if (flattened[name]) {
				Object.assign(flattened[name].children, flattenAST(node, info, flattened[name].children));
			} else {
				// eslint-disable-next-line no-param-reassign
				flattened[name] = {
					arguments: node.arguments
						? node.arguments
								.map(argNode => ({
									[argNode.name.value]: parseLiteral(argNode.value),
								}))
								.reduce((p, nx) => ({...p, ...nx}), {})
						: {},
					children: flattenAST(node, info),
				};
			}
		}
		return flattened;
	}, obj);
}

function graphqlFields(info: GraphQLResolveInfo | FieldNodeInfo, obj: Hash<Selection> = {}): Selection {
	const fields = info.fieldNodes as Array<FieldNode>;
	const children: Hash<Selection> = fields.reduce(
		(o: Hash<Selection>, ast: FieldNode) => flattenAST(ast, info, o) as Hash<Selection>,
		obj as Hash<Selection>,
	);
	return {
		children,
	};
}

/**
 * Parses a GraphQLResolveInfo object and returns the selection of fields being requested as a flat array of string
 * @param info
 */
export function getSelectionFields(info: GraphQLResolveInfo) {
	const fields = graphqlFields(info);
	return flattenFields(fields);
}

export function getFields(info: GraphQLResolveInfo) {
	const fields = graphqlFields(info);
	if (fields.children) {
		return Object.keys(fields.children);
	}
	return [];
}
