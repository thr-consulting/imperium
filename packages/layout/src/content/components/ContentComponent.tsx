import type {DefineRouteOptions} from '@imperium/router';
import debug from 'debug';
import React from 'react';
import {DataHooks} from '../../datahooks/DataHooks';
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

export function ContentComponent<T extends DefineRouteOptions, K extends keyof T>({page, params}: ContentComponentProps<T, K>) {
	const data = useBuildContentData({stateSelectorHook: page.stateSelectorHook, params});

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
				<div className={`${styles.content} imperiumContent`}>{content}</div>
			</div>
			{sidebar}
			<DataHooks dataHooks={page.dataHooks || []} />
		</div>
	);
}
