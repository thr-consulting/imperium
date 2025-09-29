import type {DefineRouteOptions} from '@imperium/router';
import debug from 'debug';
import {isEqual} from 'lodash-es';
import {type DependencyList, type EffectCallback, useEffect, useRef, useState} from 'react';
import {useDispatch} from 'react-redux';
import {Button} from 'semantic-ui-react';
import {useMediaQuery} from 'react-responsive';
import {DataHooks} from '../../datahooks/DataHooks';
import {actions} from '../../state';
import {sortWeightedItems} from '../../utils';
import {useBuildContentData} from '../hooks/useBuildContentData';
import type {Page, RouteParameters, SidebarItem} from '../types';
import {Header} from './Header';
import {SidebarItemWrapper} from './SidebarItemWrapper';
import styles from './styles.module.css';

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
	const data = useBuildContentData({stateSelectorHook: page.stateSelectorHook, permissionSelectorHook: page.permissionSelectorHook, params});
	const [visible, setVisible] = useState(true);
	const isMobile = useMediaQuery({query: '(max-width: 900px)'});

	useDeepCompareEffect(() => {
		dispatch(actions.setParams(params));
	}, [dispatch, params]);

	useEffect(() => {
		if (typeof page.header === 'string') {
			dispatch(actions.setPageHeader(page.header));
		} else {
			dispatch(actions.setPageHeader(''));
		}
	}, [dispatch, page.header]);

	const content = page.content(data);
	const sidebarItems = sortWeightedItems(page.sidebar || []);

	const sidebar =
		sidebarItems.length > 0 ? (
			<div className={`${styles.sidebar} imperiumContentSidebar`}>
				<div className={styles.sidebarButton}>
					<Button icon="angle right" size="big" onClick={() => setVisible(false)} fluid style={{paddingLeft: 0}} />
				</div>
				<div className={styles.sidebarContent}>
					<div className={`${styles.actionsHeader} imperiumContentSidebarHeader`}>
						<h3>Actions</h3>
					</div>
					{sidebarItems.map((sb, index) => {
						return (
							// eslint-disable-next-line react/no-array-index-key
							<div className={styles.sidebarItem} key={index}>
								<SidebarItemWrapper item={sb as SidebarItem<T, K>} params={params} data={data} />
							</div>
						);
					})}
				</div>
			</div>
		) : null;

	const mobileSidebar =
		sidebarItems.length > 0 ? (
			<div className={`${styles.sidebarMobile} imperiumContentSidebar`}>
				<div className={`${styles.actionsHeader} imperiumContentSidebarHeader`}>
					<h3>Actions</h3>
				</div>
				{sidebarItems.map((sb, index) => {
					return (
						// eslint-disable-next-line react/no-array-index-key
						<div className={styles.sidebarItem} key={index}>
							<SidebarItemWrapper item={sb as SidebarItem<T, K>} params={params} data={data} />
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
			{isMobile && mobileSidebar}
			{!isMobile && (
				<>
					{visible && sidebar}
					{!visible && (
						<Button icon="angle left" size="big" onClick={() => setVisible(true)} className={styles.sidebarButton} style={{paddingLeft: 0}} />
					)}
				</>
			)}
			<DataHooks dataHooks={page.dataHooks || []} />
		</div>
	);
}
