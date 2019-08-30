import debug from 'debug';
import isFunction from 'lodash/isFunction';
import {Response, NextFunction} from 'express';
import Context from './Context';
import {
	ImperiumConnectors,
	ImperiumRequest,
	ImperiumServerModule,
} from '../../types';

const d = debug('imperium.core.server.context');

interface ContextMiddlewareOptions {
	connectors: ImperiumConnectors;
	modules: ImperiumServerModule[];
}

/**
 * Express middleware that creates the context (data models & auth info).
 *
 * Adds .context to the req
 *
 * @param connectors
 * @param modules
 * @returns {function(*, *, *)}
 */
export default function contextMiddleware({
	connectors,
	modules,
}: ContextMiddlewareOptions) {
	return (req: ImperiumRequest, res: Response, next: NextFunction) => {
		d('Creating context');

		const context = new Context(connectors); // Create a brand new instance of Context

		if (!modules) throw new Error('Modules are not defined');

		// Loop through each defined module and add it's data models (if any) to the context
		modules.forEach(module => {
			if (module.models && isFunction(module.models))
				context.addModels(module.models);
		});

		// Add the context object to the req
		req.context = context;

		next();
	};
}
