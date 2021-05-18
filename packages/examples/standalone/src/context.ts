import {createDomain} from '@imperium/example-domain';
import type {AuthenticatedUser, ImperiumContext, Connectors} from '@imperium/connector';

export async function contextCreator(conn: Connectors, authenticatedUser?: AuthenticatedUser) {
	return createDomain(conn, authenticatedUser);
}

export type Context = ImperiumContext<typeof contextCreator>;
