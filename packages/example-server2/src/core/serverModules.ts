// Define server modules that should be included in the server.
import {ImperiumServerModule} from '@imperium/server';
import {serverModule1} from '../serverModule1/serverModule1';

export const serverModules: ImperiumServerModule<any, any>[] = [serverModule1];
