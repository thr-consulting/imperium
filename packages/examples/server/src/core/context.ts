import debug from 'debug';
import type {AuthenticatedUser, ImperiumContext} from '@imperium/connector';
import {createDomain} from '@imperium/example-domain';
import type {connectors} from './connectors';

const d = debug('imperium.examples.server.context');

export async function contextCreator(conn: typeof connectors, authenticatedUser?: AuthenticatedUser) {
	return createDomain(conn, authenticatedUser);
}

export type Context = ImperiumContext<typeof contextCreator>;
