import type {ImperiumClientModule} from '@imperium/client';
import type {Slice} from '@reduxjs/toolkit';

export interface ImperiumStateClientModule extends ImperiumClientModule {
	state?: Slice;
}

export function isImperiumStateClientModule(value: ImperiumClientModule): value is ImperiumStateClientModule {
	return (value as ImperiumStateClientModule).state !== undefined;
}
