/* eslint-disable import/no-duplicates */

declare module '*.graphqls' {
	import {DocumentNode} from 'graphql';

	const content: DocumentNode;
	export default content;
}

declare module '*.graphql' {
	import {DocumentNode} from 'graphql';

	const gcontent: DocumentNode;
	export default gcontent;
}

declare module '*.css' {
	interface ClassNames {
		[className: string]: string,
	}
	const classNames: ClassNames;
	export = classNames;
}
