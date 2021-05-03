import type {Collection, FileInfo, JSCodeshift} from 'jscodeshift';
import path from 'path';

function replaceDebugNamespace(namespace: string, root: Collection) {
	root.findVariableDeclarators('d').forEach(v => {
		if (v.value.init?.type === 'CallExpression' && v.value.init.callee.type === 'Identifier' && v.value.init.callee.name === 'debug') {
			const arg = v.value.init.arguments[0];
			if (arg && arg.type === 'StringLiteral') {
				arg.value = namespace;
			}
		}
	});
}

export function fixDebugNamespace(root: Collection, j: JSCodeshift, fileInfo: FileInfo) {
	// Parse the current file's path
	const pathMatched = /^packages\/(.+)\/src\/(.*)/.exec(fileInfo.path);
	if (pathMatched === null) return null;
	const pkgName = pathMatched[1];
	const parsed = path.parse(pathMatched[2]);

	// Build the debug namespace string
	const nameArr = ['imperium', pkgName, ...parsed.dir.split(path.sep), parsed.name === 'index' ? null : parsed.name];
	const name = nameArr
		.filter((v, index) => {
			if (index !== 0 && nameArr[index - 1] === v) {
				return false;
			}
			return v !== null && v !== '';
		})
		.join('.');

	// Replace `d` variable declarators
	replaceDebugNamespace(name, root);
}
