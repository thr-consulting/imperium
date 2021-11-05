import type {DefineRouteOptions} from '@imperium/router';
import React from 'react';
import debug from 'debug';
import styles from './styles.css';
import type {ContentData, ContentHeader} from '../types';

const d = debug('imperium.layout.content.Header');

interface HeaderProps<T extends DefineRouteOptions, K extends keyof T> {
	header: ContentHeader<T, K>;
	data: ContentData<T, K>;
}

export function Header<T extends DefineRouteOptions, K extends keyof T>({data, header}: HeaderProps<T, K>) {
	if (header) {
		let headerInfo = {
			title: '',
		};
		if (typeof header === 'string') {
			headerInfo.title = header;
		} else if (typeof header === 'function') {
			headerInfo = header(data);
		} else {
			headerInfo = header;
		}
		return (
			<div className={styles.header}>
				<h2>{headerInfo.title}</h2>
			</div>
		);
	}
	return null;
}
