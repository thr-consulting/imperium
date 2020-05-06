import {ImperiumServerModule} from '@imperium/server';
import type {connectors} from '../core/connectors';
import type {ContextCreator} from '../core/server';

export const serverModule1: ImperiumServerModule<ContextCreator, typeof connectors> = {
	name: 'Server Module 1',
};
