import debug from 'debug';
import flowRight from 'lodash/flowRight';
import queryString from 'querystring';
import type {Location} from 'history';
import compact from 'lodash/compact';
import merge from 'lodash/merge';
import {useLocation} from 'react-router-dom';
import type {Data, Item} from '../types';
import {useIsActiveRoute} from './useIsActiveRoute';

const d = debug('imperium.layout.useBuildData');

export function useBuildData(item: Item, data?: Data) {
	let finalSelectorHook: () => any = () => ({});
	if (item.stateSelectorHook) {
		finalSelectorHook = Array.isArray(item.stateSelectorHook) ? flowRight(item.stateSelectorHook) : item.stateSelectorHook;
	}
	const state = finalSelectorHook();
	const loc = useLocation() as Location;
	const route = {
		path: compact(loc.pathname.split('/')),
		hash: loc.hash,
		search: queryString.parse(loc.search),
	};
	const active = useIsActiveRoute(item, {loc, route, state, active: false});
	const newData: Data = {state, loc, active, route};

	return data ? merge(data, newData) : newData;
}
