import type {DefineRouteOptions} from '@imperium/router';
import debug from 'debug';
import type {ReactNode} from 'react';
import {Header as H} from 'semantic-ui-react';
import type {ContentData, ContentHeader} from '../types';
import {isContentHeaderObject} from '../types';
import styles from './styles.module.css';

const d = debug('imperium.layout.content.components.Header');

interface HeaderProps<T extends DefineRouteOptions, K extends keyof T> {
	header: ContentHeader<T, K>;
	data: ContentData<T, K>;
}

export function Header<T extends DefineRouteOptions, K extends keyof T>({data, header}: HeaderProps<T, K>) {
	if (header) {
		let headerComp: ReactNode = null;
		if (typeof header === 'string') {
			headerComp = <H size="large" content={header} />;
		} else if (typeof header === 'function') {
			const a = header(data);
			if (isContentHeaderObject(a)) {
				headerComp = <H size={a.size || 'large'} content={a.title} icon={a.icon} />;
			} else {
				headerComp = a;
			}
		} else if (isContentHeaderObject(header)) {
			headerComp = <H size={header.size || 'large'} content={header.title} icon={header.icon} />;
		} else {
			headerComp = header;
		}
		return <div className={`${styles.header} imperiumContentHeader`}>{headerComp}</div>;
	}
	return null;
}
