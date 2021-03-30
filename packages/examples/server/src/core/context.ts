import debug from 'debug';
import type {AuthenticatedUser, ImperiumContext, Connectors} from '@imperium/connector';
import {createDomain} from '@imperium/example-domain';

const d = debug('imperium.examples.server.context');

export async function contextCreator(conn: Connectors, authenticatedUser?: AuthenticatedUser) {
	return createDomain(conn, authenticatedUser);
}

export type Context = ImperiumContext<typeof contextCreator>;
