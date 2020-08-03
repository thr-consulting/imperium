import { ImperiumServerModule } from '@imperium/server';
import { ImperiumGraphqlServerModule } from '@imperium/graphql-server';
export default function sample(): ImperiumServerModule & ImperiumGraphqlServerModule;
