import type {ImperiumContext} from '@imperium/connector';
import {createDomain} from './core/createDomain';
import {getConnector} from './core/connectors';

export type Context = ImperiumContext<typeof createDomain>;
export {createDomain};
export {getConnector};
export {entities} from './core/entities';
export * from './photo';
export * from './user';
