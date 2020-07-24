import debug from 'debug';
import type {TypeOfPromise} from '@imperium/util';
import {createDomain} from './core/createDomain';

const d = debug('imperium.examples.domain');

export type Context = TypeOfPromise<ReturnType<typeof createDomain>>;
export {createDomain};
export {entities} from './core/entities';
export * from './photo';
export * from './user';
