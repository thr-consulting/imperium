import type {ImperiumClientModule} from '@imperium/client';
import type {Slice, Middleware, PayloadAction, AnyAction, SliceCaseReducers} from '@reduxjs/toolkit';

export type StateSerializer = (value: any) => unknown;
export type ActionSerializer = (action: PayloadAction<any>) => unknown;

export interface Serializer {
	state?: {
		[name: string]: StateSerializer;
	};
	actions?: {
		[name: string]: ActionSerializer;
	};
}

// Distilled action serializers
export interface ActionSerializers {
	[type: string]: ActionSerializer;
}

export interface StateClientOptions {
	middleware?: Middleware[];
}

export interface SliceWithSerializer<State = any, CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>>
	extends Slice<State, CaseReducers> {
	serializer?: Serializer;
}

export interface ImperiumStateClientModule extends ImperiumClientModule {
	state?: SliceWithSerializer;
}

export function isImperiumStateClientModule(value: ImperiumClientModule): value is ImperiumStateClientModule {
	return (value as ImperiumStateClientModule).state !== undefined;
}
export function isPayloadAction(value: AnyAction): value is PayloadAction {
	return (value as PayloadAction).type !== undefined;
}
