import debug from 'debug';
import {Auth, ContextManager, Connector} from '@imperium/context-manager';

const d = debug('imperium.example.server.domainauth');

type DomainAuthConnectors = Connector<{}>;

export function createDomainAuthContext(connectors: DomainAuthConnectors) {
	return new ContextManager({}, connectors, new Auth({doIt() {}}));
}

export type Context = ReturnType<typeof createDomainAuthContext>;
