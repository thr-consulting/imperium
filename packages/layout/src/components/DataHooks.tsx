import debug from 'debug';
import React from 'react';
import {useLocation} from 'react-router-dom';
import {compose} from 'lodash/fp';
import type {DataHookItem} from '../types';
import {ExecuteDataHook} from './ExecuteDataHook';

const d = debug('imperium.layout.DataHooks');

interface DataHooksProps {
	dataHooks: DataHookItem[];
}

/**
 * Renders layout data hooks. These hooks should return nothing. All interaction should be in side-effects, usually retrieving data and setting Redux state.
 * @param dataHooks
 * @constructor
 */
export function DataHooks({dataHooks}: DataHooksProps) {
	const {pathname} = useLocation();

	return (
		<>
			{dataHooks.map((hook, index) => {
				if (typeof hook === 'function') {
					// eslint-disable-next-line react/no-array-index-key
					return <ExecuteDataHook key={index} dataHook={hook} />;
				}
				const fn = Array.isArray(hook.routeMatch) ? compose(hook.routeMatch) : hook.routeMatch;
				const routeParams = fn(pathname);
				if (Array.isArray(hook.dataHook)) {
					return (
						// eslint-disable-next-line react/no-array-index-key
						<React.Fragment key={index}>
							{hook.dataHook.map((dh, index2) => {
								// eslint-disable-next-line react/no-array-index-key
								return <ExecuteDataHook key={index2} dataHook={dh} routeParams={routeParams} />;
							})}
						</React.Fragment>
					);
				}
				// eslint-disable-next-line react/no-array-index-key
				return <ExecuteDataHook dataHook={hook.dataHook} key={index} routeParams={routeParams} />;
			})}
		</>
	);
}
