import debug from 'debug';
import path from 'path';
import compression from 'compression';
import express from 'express';

const d = debug('imperium.core.server.production');

const isProduction = process.env.NODE_ENV === 'production';

export default function({app}) {
	if (isProduction) {
		d('Activating client endpoint for production');
		app.use(compression());
		app.use('/static', express.static(path.join(__dirname, 'client')));
	}
}
