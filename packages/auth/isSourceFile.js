/* eslint-disable prefer-destructuring */
const path = require('path');

/**
 * For use with Babel/register. Allows filtering of specified source folders.
 * @param sourceDirs
 * @return {function(*=)}
 */
function isSourceFile(sourceDirs) {
	return filepath => sourceDirs.reduce((memo, value) => {
		if (new RegExp(`${value}/.*`).test(filepath)) {
			// If node_modules exists in the relative path, do flag as valid file
			if (/node_modules/.test(path.relative(value, filepath))) {
				return memo;
			}
			return true;
		}
		return memo;
	}, false);
}

module.exports = isSourceFile;
