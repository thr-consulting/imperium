declare module '*.graphql' {
	import type {DocumentNode} from 'graphql';

	const gcontent: DocumentNode;
	export default gcontent;
}
