import React from 'react';
import {useLocation} from 'react-router-dom';
import debug from 'debug';
import type {Location} from 'history';
import compact from 'lodash/compact';
import {Query} from 'mingo';
import queryString from 'querystring';
import type {DefaultVisibilityData, VisibilityItem, VisibilityQueryField} from '../types';
import {ExecuteSelectorHook} from './ExecuteSelectorHook';

const d = debug('imperium.layout.components.RenderIfVisible');

function mergeLocationData(loc: Location, data?: Record<string, unknown>) {
	const locationData = {
		path: compact(loc.pathname.split('/')),
		hash: loc.hash,
		search: queryString.parse(loc.search),
	};
	return {
		router: {
			...locationData,
		},
		...data,
	};
}

function renderWithQuery(
	data: Record<string, unknown> & DefaultVisibilityData,
	query: VisibilityQueryField<Record<string, unknown>> | undefined,
	component: JSX.Element,
) {
	if (typeof query === 'function') {
		if (query(data)) return component;
		return null;
	}
	const q = new Query(query || {});
	if (q.test(data)) return component;
	return null;
}

export function RenderIfVisible({item, component}: {component: JSX.Element; item: VisibilityItem}) {
	const loc = useLocation();

	if (item.visible) {
		if (item.visible.selectorHook) {
			return (
				<ExecuteSelectorHook
					hook={item.visible.selectorHook}
					render={data => renderWithQuery(mergeLocationData(loc, data), item.visible?.query, component)}
				/>
			);
		}

		return renderWithQuery(mergeLocationData(loc), item.visible.query, component);
	}

	return component;
}
