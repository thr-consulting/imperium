import debug from 'debug';
import {createDomain} from '@imperium/example-domain';
import type {Connectors, AuthenticatedUser, ImperiumContext} from '@imperium/connector';

const d = debug('imperium.examples.server.context');

export async function contextCreator(conn: Connectors, authenticatedUser?: AuthenticatedUser) {
	return createDomain(conn, authenticatedUser);
}

export type Context = ImperiumContext<typeof contextCreator>;
