import type {Routes, DefineRouteOptions, KeyedRouteRenderFns} from '@imperium/router';
import debug from 'debug';
import React from 'react';
import {ContentComponent} from './components/ContentComponent';
import type {Pages, RouteParameters} from './types';

const d = debug('imperium.layout.content.createPages');

export function createPages<T extends DefineRouteOptions>(routes: Routes<T>, pages: Pages<T>) {
	const renderRoutePropsObj = Object.keys(routes.types).reduce((memo, key) => {
		return {
			...memo,
			[key]: (params: RouteParameters<T[typeof key]['params']>) => {
				return <ContentComponent page={pages[key]} params={params} />;
			},
		};
	}, {} as KeyedRouteRenderFns<T>);

	return routes.renderRouteProps(renderRoutePropsObj);
}
