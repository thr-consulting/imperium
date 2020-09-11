/* eslint-disable no-console, @typescript-eslint/no-var-requires */
const debug = require('debug');
const http = require('http');
const chalk = require('chalk');
const url = require('url');
const fs = require('fs');
const path = require('path');

const d = debug('imperium.production.web');
const port = process.argv[2] || 4000;
const rootPath = path.resolve(process.cwd());
const buildPath = path.resolve(rootPath, 'build', 'client');

if (!fs.existsSync(path.resolve(buildPath, 'index.html'))) {
	console.log('Production files are not built.');
	process.exit(1);
}

// Copy .env file
if (fs.existsSync(path.resolve(rootPath, 'env.js'))) {
	fs.copyFileSync(path.resolve(rootPath, 'env.js'), path.resolve(buildPath, 'env.js'));
}

// Display banner and info
console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='));
console.log(chalk.bold.white('  Imperium Framework - Production'));
console.log(chalk.bold.white('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-='));
console.log(`Master process PID: ${process.pid}`);
console.log(`Server port:        ${port || 4001}`);
console.log('');

// maps file extention to MIME type
const mimeMap = {
	'.ico': 'image/x-icon',
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.json': 'application/json',
	'.css': 'text/css',
	'.png': 'image/png',
	'.jpg': 'image/jpeg',
	'.wav': 'audio/wav',
	'.mp3': 'audio/mpeg',
	'.svg': 'image/svg+xml',
	'.pdf': 'application/pdf',
	'.doc': 'application/msword',
};

http
	.createServer((req, res) => {
		d(`${req.method} ${req.url}`);

		// parse URL
		const parsedUrl = url.parse(req.url);
		const pathname = `.${parsedUrl.pathname}`;
		let {ext} = path.parse(pathname);
		let resolvedPathname = path.resolve(buildPath, pathname);

		// File/folder does not exist, fall back to root index.html
		if (!fs.existsSync(resolvedPathname)) {
			resolvedPathname = path.resolve(buildPath, 'index.html');
			ext = '.html';
		}

		// If it's a directory, search for index.html
		if (fs.statSync(resolvedPathname).isDirectory()) {
			resolvedPathname = path.resolve(resolvedPathname, pathname, 'index.html');
			ext = '.html';
		}

		// read file from file system
		fs.readFile(resolvedPathname, (err, data) => {
			if (err) {
				res.statusCode = 500;
				res.end(`Error getting the file: ${err}.`);
			} else {
				// if the file is found, set Content-type and send data
				res.setHeader('Content-type', mimeMap[ext] || 'text/plain');
				res.end(data);
			}
		});
	})
	.listen(parseInt(port, 10));
