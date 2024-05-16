import type {ImperiumClientModule} from '@imperium/client';
import type {Slice, Middleware} from '@reduxjs/toolkit';

export interface StateClientOptions {
	middleware?: Middleware[];
}

export interface ImperiumStateClientModule extends ImperiumClientModule {
	state?: Slice | Slice[];
}

export function isImperiumStateClientModule(value: ImperiumClientModule): value is ImperiumStateClientModule {
	return (value as ImperiumStateClientModule).state !== undefined;
}
