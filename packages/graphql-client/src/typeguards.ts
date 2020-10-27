import type {DefinitionNode, DirectiveDefinitionNode, FieldNode, FragmentSpreadNode, SelectionNode, TypeSystemDefinitionNode} from 'graphql';

export function isFieldNode(node: SelectionNode): node is FieldNode {
	return (node as SelectionNode).kind === 'Field';
}

export function isFragmentSpreadNode(node: SelectionNode): node is FragmentSpreadNode {
	return (node as SelectionNode).kind === 'FragmentSpread';
}

export function isDirectiveDefinitionNode(node: DefinitionNode): node is DirectiveDefinitionNode {
	return (node as DefinitionNode).kind === 'DirectiveDefinition';
}
