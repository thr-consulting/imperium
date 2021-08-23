import React from 'react';
import type {DataHook} from '../types';
import {ExecuteDataHook} from './ExecuteDataHook';

interface DataHooksProps {
	dataHooks: DataHook[];
}

/**
 * Renders layout data hooks. These hooks should return nothing. All interaction should be in side-effects, usually retrieving data and setting Redux state.
 * @param dataHooks
 * @constructor
 */
export function DataHooks({dataHooks}: DataHooksProps) {
	return (
		<>
			{dataHooks.map((hook, index) => (
				// eslint-disable-next-line react/no-array-index-key
				<ExecuteDataHook key={index} dataHook={hook} />
			))}
		</>
	);
}
