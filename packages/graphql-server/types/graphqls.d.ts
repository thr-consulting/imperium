declare module '*.graphqls' {
	import {DocumentNode} from 'graphql';

	const Schema: DocumentNode;

	export = Schema;
}
