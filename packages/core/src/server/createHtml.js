import debug from 'debug';
import fs from 'fs';
import {join, resolve} from 'path';
import {promisify} from 'es6-promisify';

const d = debug('imperium.core.server.createHtml');
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Waits until webpack-dev-middleware is done compiling and then retrieves a file
 * @param hmrInstance
 * @param file
 * @returns {Promise}
 */
function readDevFile(hmrInstance, file) {
	return new Promise(res => {
		hmrInstance.waitUntilValid(() => {
			res(hmrInstance.fileSystem.readFileSync(file));
		});
	});
}

/**
 * Function that returns an Express endpoint handler promise that renders our base client HTML.
 * @returns {Promise.<function(req, res)>}
 */
export default async function createHtml(hmrInstance) {
	const readFile = promisify(fs.readFile);

	// The index file location depends on production or development mode
	//   production: The index file is generated and stored in the build folder
	//   development: The index file is generated and stored in the build-dev folder (in memory-fs)
	const indexFile = isProduction ? join(__dirname, 'client', 'index.html') : resolve(process.cwd(), 'build-dev', 'index.html');
	const html = isProduction ? await readFile(indexFile, 'utf-8') : await readDevFile(hmrInstance, indexFile);
	d('Loading index HTML');

	// Return the Express middleware
	return (req, res) => {
		d('Sending HTML to client');
		res.write(html);
		res.end();
	};
}
