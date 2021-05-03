import type {ImperiumContext} from '@imperium/connector';
import type {createDomain} from './createDomain';

export type Context = ImperiumContext<typeof createDomain>;
