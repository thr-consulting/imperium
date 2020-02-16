import {IContextManager} from '@imperium/server';
import {AuthModuleContext} from '@imperium/auth-server';
import {SampleContext} from './sample';
import {SampleuserContext} from './sampleuser';

export type ContextManager = IContextManager<
	ReturnType<typeof SampleContext> & ReturnType<typeof SampleuserContext> & ReturnType<typeof AuthModuleContext>
>;
