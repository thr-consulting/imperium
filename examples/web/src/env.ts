import {defaults as authorizationDefaults} from '@imperium/authorization';
import {Environment} from '@thx/env';

// This file is an entry point used BEFORE index.tsx, so it loads the defaults properly.

Environment.addDefaults(authorizationDefaults);
