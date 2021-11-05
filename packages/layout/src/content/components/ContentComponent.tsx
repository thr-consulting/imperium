import React from 'react';
import debug from 'debug';
import type {DefineRouteOptions} from '@imperium/router';
import type {Page, RouteParameters} from '../types';
import styles from './styles.css';
import {Header} from './Header';
import {sortWeightedItems} from '../../utils';
import {useBuildContentData} from '../hooks/useBuildContentData';
import {SidebarItemWrapper} from './SidebarItemWrapper';
import {DataHooks} from '../../datahooks/DataHooks';

const d = debug('imperium.layout.content.ContentComponent');

interface ContentComponentProps<T extends DefineRouteOptions, K extends keyof T> {
	page: Page<T, K>;
	params: RouteParameters<T[K]['params']>;
}

export function ContentComponent<T extends DefineRouteOptions, K extends keyof T>({page, params}: ContentComponentProps<T, K>) {
	const data = useBuildContentData({stateSelectorHook: page.stateSelectorHook, params});

	const content = page.content(data);
	const sidebarItems = sortWeightedItems(page.sidebar || []);

	const sidebar =
		sidebarItems.length > 0 ? (
			<div className={styles.sidebar}>
				<div className={styles.actionsHeader}>
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
		<div className={styles.parent}>
			<div className={styles.content}>
				<Header header={page.header} data={data} />
				{content}
			</div>
			{sidebar}
			<DataHooks dataHooks={page.dataHooks || []} />
		</div>
	);
}
