import type {Connectors, AuthenticatedUser, ImperiumContext} from '@imperium/connector';
import {createDomain} from '@imperium/example-domain';
import debug from 'debug';

const d = debug('imperium.examples.noexpress-server.core.context');

export async function contextCreator(conn: Connectors, authenticatedUser?: AuthenticatedUser) {
	return createDomain(conn, authenticatedUser);
}

export type Context = ImperiumContext<typeof contextCreator>;
