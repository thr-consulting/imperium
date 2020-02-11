import {IContextManager} from '@imperium/server';
import {SampleContext} from './sample';

export type ContextManager = IContextManager<ReturnType<typeof SampleContext>>;
