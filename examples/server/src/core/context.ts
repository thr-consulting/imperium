import type {ImperiumContext, Connectors} from '@imperium/connector';
import {createDomain} from '@imperium/example-domain';
import debug from 'debug';
import type {AuthenticationRequest} from '@imperium/authorization';

const d = debug('imperium.server.core.context');

export async function contextCreator(conn: Connectors, authenticatedUser?: AuthenticationRequest) {
	return createDomain(conn, authenticatedUser);
}

export type Context = ImperiumContext<typeof contextCreator>;
