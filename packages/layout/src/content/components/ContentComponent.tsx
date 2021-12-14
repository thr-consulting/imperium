import type {DefineRouteOptions} from '@imperium/router';
import debug from 'debug';
import {isEqual} from 'lodash';
import React, {DependencyList, EffectCallback, useEffect, useRef} from 'react';
import {useDispatch} from 'react-redux';
import {DataHooks} from '../../datahooks/DataHooks';
import {actions} from '../../state';
import {sortWeightedItems} from '../../utils';
import {useBuildContentData} from '../hooks/useBuildContentData';
import type {Page, RouteParameters} from '../types';
import {Header} from './Header';
import {SidebarItemWrapper} from './SidebarItemWrapper';
import styles from './styles.css';

const d = debug('imperium.layout.content.components.ContentComponent');

interface ContentComponentProps<T extends DefineRouteOptions, K extends keyof T> {
	page: Page<T, K>;
	params: RouteParameters<T[K]['params']>;
}

function useDeepCompareMemoize(value: any) {
	const ref = useRef();
	if (!value && !ref.current) return ref.current;
	if (!isEqual(value, ref.current)) {
		ref.current = value;
	}
	return ref.current;
}

function useDeepCompareEffect(callback: EffectCallback, deps: DependencyList) {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(callback, deps.map(useDeepCompareMemoize));
}

export function ContentComponent<T extends DefineRouteOptions, K extends keyof T>({page, params}: ContentComponentProps<T, K>) {
	const dispatch = useDispatch();
	const data = useBuildContentData({stateSelectorHook: page.stateSelectorHook, params});

	useDeepCompareEffect(() => {
		dispatch(actions.setParams(params));
	}, [dispatch, params]);

	const content = page.content(data);
	const sidebarItems = sortWeightedItems(page.sidebar || []);

	const sidebar =
		sidebarItems.length > 0 ? (
			<div className={`${styles.sidebar} imperiumContentSidebar`}>
				<div className={`${styles.actionsHeader} imperiumContentSidebarHeader`}>
					<h3>Actions</h3>
				</div>
				{sidebarItems.map((sb, index) => {
					return (
						// eslint-disable-next-line react/no-array-index-key
						<div className={styles.sidebarItem} key={index}>
							<SidebarItemWrapper item={sb} params={params} data={data} />
						</div>
					);
				})}
			</div>
		) : null;

	return (
		<div className={`${styles.parent} imperiumContentWrapperParent`}>
			<div className={`${styles.wrapper} imperiumContentWrapper`}>
				<Header header={page.header} data={data} />
				<div className={`${styles.content} imperiumContent ${page.full && styles.contentFull}`}>{content}</div>
			</div>
			{sidebar}
			<DataHooks dataHooks={page.dataHooks || []} />
		</div>
	);
}
