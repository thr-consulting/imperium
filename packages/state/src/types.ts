import type {ImperiumClientModule} from '@imperium/client';
import type {Slice, Middleware, SliceCaseReducers, CaseReducerActions} from '@reduxjs/toolkit';

export type Modify<T, R> = Omit<T, keyof R> & R;

export type ParseFn = (statePart: any) => any;
export type SerializeFn = (actionPayload: any) => any;
export interface Serializer {
	state: {
		[K: string]: ParseFn;
	};
	actions: {
		[K: string]: SerializeFn;
	};
}

export interface ActionPayload<Payload> {
	payload: Payload;
	type: string;
}
export type ActionCreatorFn<Arg, Payload> = (arg: Arg) => ActionPayload<Payload>;
export type ActionCreators<Actions extends Serializer['actions']> = {
	[key in keyof Actions]: ActionCreatorFn<Parameters<Actions[key]>[0], ReturnType<Actions[key]>>;
};

export type TypedParseFn<Arg, Result> = (arg: Arg) => Result;
export type ParsedState<StateParseFns extends Serializer['state']> = {
	[key in keyof StateParseFns]: ReturnType<TypedParseFn<Parameters<StateParseFns[key]>[0], ReturnType<StateParseFns[key]>>>;
};

export function isObject(val: any): val is Record<string, unknown> {
	if (val === null) {
		return false;
	}
	return typeof val === 'function' || typeof val === 'object';
}

export interface StateClientOptions {
	middleware?: Middleware[];
}

export type SerializedSlice<
	State = any,
	CaseReducers extends SliceCaseReducers<State> = SliceCaseReducers<State>,
	T extends Serializer = Serializer,
	Name extends string = string,
> = {
	name: Name;
	actions: Modify<CaseReducerActions<CaseReducers>, ActionCreators<T['actions']>>;
	useSelector: Modify<State, ParsedState<T['state']>>;
	caseReducers: Slice<State, CaseReducers, Name>['caseReducers'];
	reducer: Slice<State, CaseReducers, Name>['reducer'];
};

export interface ImperiumStateClientModule extends ImperiumClientModule {
	state?: SerializedSlice | Slice;
}

export function isImperiumStateClientModule(value: ImperiumClientModule): value is ImperiumStateClientModule {
	return (value as ImperiumStateClientModule).state !== undefined;
}
