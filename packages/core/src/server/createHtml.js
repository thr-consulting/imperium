import debug from 'debug';
import fs from 'fs';
import {join, basename} from 'path';
import {promisify} from 'es6-promisify';

const d = debug('imperium.core.server.createHtml');
const isProduction = process.env.NODE_ENV === 'production';

/**
 * Render base HTML
 * @param res
 * @param assets
 */
function renderApp(res, assets) {
	d('Rendering app');

	const {manifest, app, vendor} = assets || {};

	const manifestScript = isProduction ? `<script>${manifest.text}</script>` : '';
	const vendorScript = isProduction ? `<script src="${vendor.js}"></script>` : '';
	const appScript = isProduction ? `<script src="${app.js}"></script>` : '<script src="/static/app.js"></script>';
	const initialConf = `<script>window.__INITIAL_CONF__ = ${JSON.stringify({
		graphql: `${process.env.GRAPHQL_HOST}/api/graphql`,
		jwt_localstorage_name: process.env.JWT_LOCALSTORAGE_NAME,
	})}</script>`;

	const html = `<html>
    <head>
	    <meta charSet="utf-8"/>
	    <meta name="mobile-web-app-capable" content="yes"/>
	    <title>${process.env.APPNAME}</title>
	    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.3.1/semantic.min.css"></link>
	  </head>
	  <body>
	    ${initialConf}
	    <div id="root"><h2 style="margin-left: 50px; margin-top: 50px;">Loading application...</h2></div>
		  ${manifestScript}
		  ${vendorScript}
		  ${appScript}
	  </body>
	</html>`;

	res.write('<!DOCTYPE html>');
	res.write(html);
	res.end();
}

/**
 * Function that returns an Express endpoint handler promise that renders our base client HTML.
 * @returns {Promise.<function(*, *=)>}
 */
export default async function createHtml() {
	// Read the assets file once, so it doesn't read on every request
	let assets;
	if (isProduction) {
		console.log(__dirname, process.cwd());
		// Source files change names (cache-busting) so read assets file
		assets = require('assets.json'); // eslint-disable-line global-require
		console.log(assets);
		const readFile = promisify(fs.readFile);
		assets.manifest.text = await readFile(join(__dirname, 'client', basename(assets.manifest.js)), 'utf-8');
	}

	// Return the Express middleware
	return (req, res) => {
		if (isProduction) {
			renderApp(res, assets);
		} else {
			renderApp(res);
		}
	};
}
