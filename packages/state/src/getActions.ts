import type {CaseReducerActions, Slice, SliceCaseReducers} from '@reduxjs/toolkit';
import type {ActionCreators, Modify, Serializer} from './types';

/**
 * Gets actions from a Redux slice overridden with actions that serialize the data first
 * @param slice
 * @param ser
 */
export function getActions<State, CaseReducers extends SliceCaseReducers<State>, T extends Serializer>(slice: Slice<State, CaseReducers>, ser: T) {
	const actions = {} as ActionCreators<T['actions']>;

	const actionSerializer = ser.actions;

	Object.keys(ser.actions).forEach(sliceActionKey => {
		if (actionSerializer[sliceActionKey]) {
			// @ts-ignore Overriding index type
			actions[sliceActionKey] = (arg: Parameters<T['actions'][keyof T['actions']]>[0]) => {
				return {
					payload: ser.actions[sliceActionKey](arg),
					type: `${slice.name}/${sliceActionKey}`,
				};
			};
		}
	});

	return {
		...slice.actions,
		...actions,
	} as Modify<CaseReducerActions<CaseReducers>, ActionCreators<T['actions']>>;
}
