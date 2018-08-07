import debug from 'debug';
import fs from 'fs';
import {join} from 'path';
import {promisify} from 'es6-promisify';

const d = debug('imperium.core.server.createHtml');
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Function that returns an Express endpoint handler promise that renders our base client HTML.
 * @returns {Promise.<function(req, res)>}
 */
export default async function createHtml() {
	d('Loading index HTML');
	const readFile = promisify(fs.readFile);
	const indexFile = isProduction ? join(__dirname, 'client', 'index.html') : join(process.cwd(), 'build-dev', 'index.html');
	const html = await readFile(indexFile, 'utf-8');

	// Return the Express middleware
	return (req, res) => {
		d('Sending HTML to client');
		res.write(html);
		res.end();
	};
}
