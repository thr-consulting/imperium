import type {Collection, JSCodeshift, FileInfo} from 'jscodeshift';
import path from 'path';
import findUp from 'find-up';
import fs from 'fs';

interface Alias {
	alias: string;
	path: string;
	base: string;
	fullPath: string;
}

/**
 * Return Alias objects for each found aliases in nearest tsconfig.json
 * @param pth
 */
function getAliases(pth: string): Alias[] | null {
	// Read and parse the tsconfig file
	const cwd = path.resolve(path.dirname(pth));
	const tsconfigPath = findUp.sync('tsconfig.json', {cwd});
	if (!tsconfigPath) return null;
	const tsconfigRaw = fs.readFileSync(tsconfigPath, {encoding: 'utf-8'});
	const tsconfig = JSON.parse(tsconfigRaw);

	// Check for tsconfig options
	if (!tsconfig.compilerOptions || !tsconfig.compilerOptions.paths) return null;

	// Iterate over tsconfig alias paths and generate Alias objects for each one
	return Object.keys(tsconfig.compilerOptions.paths).map(alias => {
		return {
			alias: alias.replace(/\/\*$/, ''),
			path: tsconfig.compilerOptions.paths[alias][0].replace(/\/\*$/, ''),
			base: path.dirname(tsconfigPath),
			fullPath: path.join(path.dirname(tsconfigPath), tsconfig.compilerOptions.paths[alias][0].replace(/\/\*$/, '')),
		};
	});
}

/**
 * Replace the import pth with the matched alias path.
 * @param aliases
 * @param pth
 */
function replacePathAlias(aliases: Alias[], pth: string) {
	const ret = aliases.reduce((memo, alias) => {
		if (memo !== '') return memo;
		if (pth.includes(alias.fullPath)) {
			const relativePath = path.relative(alias.fullPath, pth);
			// console.log(relativePath, alias.alias);
			return path.join(alias.alias, relativePath);
		}
		return '';
	}, '');
	if (ret === '') throw new Error('Could not match import to alias');
	return ret;
}

/**
 * Returns true if pth is one of the aliased paths, otherwise false.
 * @param aliases
 * @param pth
 */
function isAliasedPath(aliases: Alias[], pth: string) {
	return aliases.reduce((memo, alias) => {
		if (memo) return true;
		return pth.includes(alias.fullPath);
	}, false);
}

export function renameAliasImports(root: Collection, j: JSCodeshift, fileInfo: FileInfo) {
	// Find the aliases defined in nearest tsconfig.json
	const aliases = getAliases(fileInfo.path);
	if (!aliases) return;

	// Find import declarations that match aliased paths
	const imps = root.find(j.ImportDeclaration, node => {
		if (/^[^.]/.test(node.source.value)) return null;
		const importPath = path.join(path.dirname(fileInfo.path), node.source.value);
		if (!isAliasedPath(aliases, path.join(process.cwd(), importPath))) return null;
		return node;
	});

	// Replace the import paths with aliases
	imps.forEach(p => {
		const importPath = path.join(path.dirname(fileInfo.path), p.value.source.value as string);
		p.value.source.value = replacePathAlias(aliases, path.join(process.cwd(), importPath));
	});

	// Search import declarations for imports renamed wrongly by Webstorm refactoring and fix them
	root.find(j.ImportDeclaration).forEach(np => {
		if (typeof np.node.source.value === 'string') {
			const x = /^packages\/(.*)\/src\/(.*)$/.exec(np.node.source.value);
			if (!x) return;
			np.node.source.value = `~${x[2]}`;
		}
	});
}
