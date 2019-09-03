declare module '*.graphqls' {
	import {DocumentNode} from 'graphql';

	const value: DocumentNode;
	export default value;
}

declare module 'graphql-scalar-objectid' {}
