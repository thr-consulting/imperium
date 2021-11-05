import type {DefineRouteOptions} from '@imperium/router';
import type {UseBuildDataParams} from '../../hooks/useBuildData';
import {useBuildData} from '../../hooks/useBuildData';
import type {ContentData, RouteParameters} from '../types';

interface UseBuildContentDataParams<T extends DefineRouteOptions, K extends keyof T> extends UseBuildDataParams {
	data?: ContentData<T, K>;
	params: RouteParameters<T[K]['params']>;
}

export function useBuildContentData<T extends DefineRouteOptions, K extends keyof T>({
	data,
	stateSelectorHook,
	routeItem,
	params,
}: UseBuildContentDataParams<T, K>) {
	const buildData = useBuildData({data, stateSelectorHook, routeItem});
	return {
		...buildData,
		params,
	};
}
