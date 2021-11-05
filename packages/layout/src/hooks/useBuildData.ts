import debug from 'debug';
import type {Location} from 'history';
import compact from 'lodash/compact';
import merge from 'lodash/merge';
import queryString from 'querystring';
import {useLocation} from 'react-router-dom';
import {useIsActiveRoute} from './useIsActiveRoute';
import type {Data, StateSelectorHook} from '../types';
import {useSelectState} from './useSelectState';

const d = debug('imperium.layout.hooks.useBuildData');

export interface UseBuildDataParams {
	data?: Data;
	routeItem?: any;
	stateSelectorHook?: StateSelectorHook | StateSelectorHook[];
}

export function useBuildData({stateSelectorHook, data, routeItem}: UseBuildDataParams) {
	const state = useSelectState(stateSelectorHook);
	const loc = useLocation() as Location;
	const route = {
		path: compact(loc.pathname.split('/')),
		hash: loc.hash,
		search: queryString.parse(loc.search),
	};
	const active = useIsActiveRoute({loc, route, state, active: false}, routeItem);
	const newData: Data = {state, loc, active, route};

	return data ? merge(data, newData) : newData;
}
