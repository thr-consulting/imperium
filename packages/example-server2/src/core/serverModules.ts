// Define server modules that should be included in the server.
import {ImperiumServerModule} from '@imperium/server';
import {graphqlServerModule} from '@imperium/graphql-server';
import {basicModule} from '../basicModule';
import {advancedModule} from '../advancedModule';
import {graphqlModule} from '../graphqlModule';

export const serverModules: ImperiumServerModule<any, any>[] = [graphqlServerModule, basicModule, advancedModule, graphqlModule];
