import debug from 'debug';
import type {AuthenticatedUser} from '@imperium/connector';
import type {TypeOfPromise} from '@imperium/util';
import {createDomain} from '@imperium/example-domain';
import type {connectors} from './connectors';

const d = debug('imperium.examples.server.context');

export async function contextCreator(conn: typeof connectors, authenticatedUser?: AuthenticatedUser) {
	return createDomain(conn, authenticatedUser);
}

export type Context = TypeOfPromise<ReturnType<typeof contextCreator>>;
