import {IContextManager} from '@imperium/server';
import {AuthModuleContext} from './index';

export type AuthContextManager = IContextManager<ReturnType<typeof AuthModuleContext>>;
