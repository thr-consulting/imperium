import type {Collection, JSCodeshift} from 'jscodeshift';

function isLocalRelative(v: string) {
	return /^\.\//.test(v);
}

function isRelative(v: string) {
	return /^\.\./.test(v);
}

function isAlias(v: string) {
	return /^~/.test(v);
}

function isExternal(v: string) {
	return !(isAlias(v) || isRelative(v) || isLocalRelative(v));
}

function calcScore(name: string) {
	if (isExternal(name)) return 3;
	if (isAlias(name)) return 2;
	if (isRelative(name)) return 1;
	// if (isLocalRelative(name)) return 0;
	return 0;
}

export function sortImports(root: Collection, j: JSCodeshift) {
	const imps = root.find(j.ImportDeclaration);

	const mappedImps = imps.nodes().map(path => {
		if (path.source.type === 'StringLiteral') {
			return {
				path,
				name: path.source.value,
			};
		}
		throw new Error("Import doesn't import from StringLiteral");
	});

	// Trying to move eslint-disable comments to the top.
	// console.log(util.inspect(imps.paths(), true, 4, true));
	// imps.nodes().forEach(v => {
	// 	console.log(util.inspect(v.comments, true, 1, true));
	// });

	const sortedImps = mappedImps
		.sort((a, b) => {
			const aScore = calcScore(a.name);
			const bScore = calcScore(b.name);

			if (aScore < bScore) return 1;
			if (aScore > bScore) return -1;

			if (a.name === b.name) return 0;

			const c = [a.name, b.name].sort();
			if (a.name === c[0]) return -1;
			if (b.name === c[0]) return 1;
			return 0;
		})
		.map(v => v.path);

	imps.at(0).insertBefore(sortedImps);
	imps.remove();
}
