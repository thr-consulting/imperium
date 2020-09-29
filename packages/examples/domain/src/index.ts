import type {ImperiumContext} from '@imperium/connector';
import {createDomain} from './core/createDomain';

export type Context = ImperiumContext<typeof createDomain>;
export {createDomain};
export {entities} from './core/entities';
export * from './photo';
export * from './user';
