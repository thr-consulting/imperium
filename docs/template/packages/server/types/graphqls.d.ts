declare module '*.graphqls' {
	import {DocumentNode} from 'graphql';
	const schema: DocumentNode;
	export = schema;
}
