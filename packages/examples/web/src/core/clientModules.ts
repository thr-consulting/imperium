import type {ImperiumClientModule} from '@imperium/client';
import {graphqlClientModule} from '@imperium/graphql-client';
import {authClientModule} from '@imperium/auth-client';
import {routerClientModule} from '@imperium/router';
import {sampleModule} from '../sample';
import {sampleGraphqlModule} from '../sample-graphql';
import {sampleAuthModule} from '../sample-auth';

export function clientModules(): ImperiumClientModule[] {
	return [graphqlClientModule(), authClientModule(), routerClientModule(), sampleModule(), sampleGraphqlModule(), sampleAuthModule()];
}
