declare module '*.graphql' {
	import type {DocumentNode} from 'graphql';

	const src: DocumentNode;
	export default src;
}
